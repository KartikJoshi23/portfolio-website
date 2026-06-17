/* ==========================================================
 * STRANDSBACKGROUND.TSX
 * Live WebGL2 backdrop — flowing, glowing "neural strands"
 * in violet/cyan/blue over obsidian. A self-contained port of
 * React Bits' Strands shader (no runtime deps). Continuously
 * animated, GPU-light, fixed full-screen, z-0, pointer-none.
 *
 * - Caps device-pixel-ratio + strand count for performance.
 * - Pauses when the tab is hidden / off-screen.
 * - Renders a single static frame under reduced motion.
 * - Falls back to a CSS gradient if WebGL2 is unavailable.
 * ========================================================== */
"use client"

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec3  uColors[8];
uniform int   uColorCount;
uniform int   uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  vec3 a = uColors[0];
  vec3 b = uColors[0];
  for (int i = 0; i < 8; i++) {
    if (i == idx) a = uColors[i];
    if (i == nextIdx) b = uColors[i];
  }
  return mix(a, b, blend);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < 12; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04;
    col += samplePalette(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
`

// Theme palette: violet → cyan → purple → blue
const COLORS = ['#7C3AED', '#06B6D4', '#A855F7', '#3B82F6']

function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '')
    return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
    ]
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
    const sh = gl.createShader(type)!
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh)
        return null
    }
    return sh
}

export default function StrandsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const reduced = useReducedMotion()
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext('webgl2', {
            antialias: true,
            alpha: true,
            premultipliedAlpha: true,
        }) as WebGL2RenderingContext | null

        if (!gl) {
            setFailed(true)
            return
        }

        const vs = compile(gl, gl.VERTEX_SHADER, VERT)
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
        if (!vs || !fs) {
            setFailed(true)
            return
        }

        const prog = gl.createProgram()!
        gl.attachShader(prog, vs)
        gl.attachShader(prog, fs)
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            setFailed(true)
            return
        }
        gl.useProgram(prog)

        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

        // full-screen triangle
        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW
        )
        const aPos = gl.getAttribLocation(prog, 'position')
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        // static uniforms
        const colorFlat = new Float32Array(8 * 3)
        COLORS.forEach((c, i) => {
            const [r, g, b] = hexToRgb(c)
            colorFlat[i * 3] = r
            colorFlat[i * 3 + 1] = g
            colorFlat[i * 3 + 2] = b
        })
        gl.uniform3fv(gl.getUniformLocation(prog, 'uColors'), colorFlat)
        gl.uniform1i(gl.getUniformLocation(prog, 'uColorCount'), COLORS.length)
        gl.uniform1i(gl.getUniformLocation(prog, 'uStrandCount'), 5)
        gl.uniform1f(gl.getUniformLocation(prog, 'uSpeed'), 0.5)
        gl.uniform1f(gl.getUniformLocation(prog, 'uAmplitude'), 1.25)
        gl.uniform1f(gl.getUniformLocation(prog, 'uWaviness'), 0.8)
        gl.uniform1f(gl.getUniformLocation(prog, 'uThickness'), 0.6)
        gl.uniform1f(gl.getUniformLocation(prog, 'uGlow'), 2.4)
        gl.uniform1f(gl.getUniformLocation(prog, 'uTaper'), 2.6)
        gl.uniform1f(gl.getUniformLocation(prog, 'uSpread'), 1.0)
        gl.uniform1f(gl.getUniformLocation(prog, 'uIntensity'), 0.6)
        gl.uniform1f(gl.getUniformLocation(prog, 'uOpacity'), 1.0)
        gl.uniform1f(gl.getUniformLocation(prog, 'uScale'), 1.5)
        gl.uniform1f(gl.getUniformLocation(prog, 'uSaturation'), 1.35)

        const uRes = gl.getUniformLocation(prog, 'uResolution')
        const uTime = gl.getUniformLocation(prog, 'uTime')

        const dpr = Math.min(window.devicePixelRatio || 1, 1.4)

        const resize = () => {
            const w = Math.floor(window.innerWidth * dpr)
            const h = Math.floor(window.innerHeight * dpr)
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w
                canvas.height = h
                gl.viewport(0, 0, w, h)
            }
        }
        resize()
        window.addEventListener('resize', resize)

        let raf = 0
        let visible = true
        const start = performance.now()

        const drawFrame = (timeSec: number) => {
            gl.uniform2f(uRes, canvas.width, canvas.height)
            gl.uniform1f(uTime, timeSec)
            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }

        const render = (now: number) => {
            if (!visible) return
            drawFrame((now - start) / 1000)
            if (!reduced) raf = requestAnimationFrame(render)
        }

        const onVisibility = () => {
            visible = document.visibilityState === 'visible'
            if (visible && !reduced) raf = requestAnimationFrame(render)
        }
        document.addEventListener('visibilitychange', onVisibility)

        if (reduced) {
            drawFrame(8.0)
        } else {
            raf = requestAnimationFrame(render)
        }

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', onVisibility)
            gl.deleteProgram(prog)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
            gl.deleteBuffer(buf)
        }
    }, [reduced])

    if (failed) {
        return (
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(120% 80% at 30% 8%, rgba(124,58,237,0.22) 0%, transparent 55%), radial-gradient(100% 70% at 80% 60%, rgba(6,182,212,0.16) 0%, transparent 55%), #09090B',
                }}
            />
        )
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
            style={{ width: '100vw', height: '100vh', display: 'block' }}
        />
    )
}
