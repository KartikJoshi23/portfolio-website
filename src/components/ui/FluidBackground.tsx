/* ==========================================================
 * FLUIDBACKGROUND.TSX
 * Live WebGL backdrop — flowing liquid light (domain-warped FBM)
 * in violet/cyan over obsidian. Continuously animated, reacts to
 * the cursor. Fixed, full-screen, z-0, pointer-events-none.
 *
 * - Caps device-pixel-ratio for performance.
 * - Pauses when the tab is hidden.
 * - Renders a single static frame under reduced motion.
 * - Falls back to a CSS gradient if WebGL is unavailable.
 * ========================================================== */
"use client"

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;   // 0..1, smoothed
uniform float u_intensity;

// ---- value noise + fbm ----
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += amp * noise(p);
    p = rot * p * 2.02 + 0.15;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  // aspect-correct, centered coords
  vec2 p = (frag * 2.0 - u_res) / u_res.y;

  float t = u_time * 0.045;

  // mouse pull (subtle parallax of the flow field)
  vec2 m = (u_mouse * 2.0 - 1.0);
  m.x *= u_res.x / u_res.y;
  p += m * 0.18;

  // ---- domain warping for that flowing-liquid look ----
  vec2 q;
  q.x = fbm(p + vec2(0.0, 0.0) + t);
  q.y = fbm(p + vec2(5.2, 1.3) - t * 0.9);

  vec2 r;
  r.x = fbm(p + 1.6 * q + vec2(1.7, 9.2) + 0.12 * t);
  r.y = fbm(p + 1.6 * q + vec2(8.3, 2.8) + 0.11 * t);

  float f = fbm(p + 2.2 * r);

  // ---- palette ----
  vec3 obsidian = vec3(0.031, 0.031, 0.043);
  vec3 violet   = vec3(0.486, 0.227, 0.929);
  vec3 cyan     = vec3(0.024, 0.714, 0.831);
  vec3 magenta  = vec3(0.776, 0.290, 0.918);

  vec3 col = obsidian;
  col = mix(col, violet, clamp(pow(r.x, 2.1) * 1.15, 0.0, 1.0));
  col = mix(col, cyan,   clamp(pow(r.y, 2.3) * 0.95, 0.0, 1.0));
  col = mix(col, magenta, clamp(pow(q.x * q.y, 1.8) * 0.45, 0.0, 1.0));

  // bright flowing filaments
  float fil = smoothstep(0.62, 0.97, f);
  col += violet * fil * 0.5;
  col += cyan   * smoothstep(0.7, 1.05, length(r)) * 0.28;

  // overall energy + vignette
  col *= (0.32 + 0.85 * f) * u_intensity;

  vec2 uv = frag / u_res;
  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col *= mix(0.32, 1.0, vig);

  // gentle top fade so navbar/text read cleanly
  col *= mix(0.62, 1.0, smoothstep(0.0, 0.4, uv.y));

  // subtle film grain to kill banding
  float g = hash(frag + u_time) * 0.025 - 0.012;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const sh = gl.createShader(type)!
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh)
        return null
    }
    return sh
}

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const reduced = useReducedMotion()
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl =
            (canvas.getContext('webgl', { antialias: false, alpha: false }) as WebGLRenderingContext | null) ||
            (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

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

        // full-screen triangle
        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            gl.STATIC_DRAW
        )
        const aPos = gl.getAttribLocation(prog, 'a_pos')
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const uRes = gl.getUniformLocation(prog, 'u_res')
        const uTime = gl.getUniformLocation(prog, 'u_time')
        const uMouse = gl.getUniformLocation(prog, 'u_mouse')
        const uIntensity = gl.getUniformLocation(prog, 'u_intensity')

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

        // smoothed mouse
        const mouse = { x: 0.5, y: 0.5 }
        const target = { x: 0.5, y: 0.5 }
        const onMove = (e: PointerEvent) => {
            target.x = e.clientX / window.innerWidth
            target.y = 1.0 - e.clientY / window.innerHeight
        }
        window.addEventListener('pointermove', onMove, { passive: true })

        gl.uniform1f(uIntensity, 1.0)

        let raf = 0
        let visible = true
        const start = performance.now()

        const onVisibility = () => {
            visible = document.visibilityState === 'visible'
            if (visible && !reduced) {
                raf = requestAnimationFrame(render)
            }
        }
        document.addEventListener('visibilitychange', onVisibility)

        const render = (now: number) => {
            if (!visible) return
            mouse.x += (target.x - mouse.x) * 0.05
            mouse.y += (target.y - mouse.y) * 0.05

            gl.uniform2f(uRes, canvas.width, canvas.height)
            gl.uniform1f(uTime, (now - start) / 1000)
            gl.uniform2f(uMouse, mouse.x, mouse.y)
            gl.drawArrays(gl.TRIANGLES, 0, 3)

            if (!reduced) raf = requestAnimationFrame(render)
        }

        if (reduced) {
            // single static frame
            gl.uniform2f(uRes, canvas.width, canvas.height)
            gl.uniform1f(uTime, 12.0)
            gl.uniform2f(uMouse, 0.5, 0.5)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        } else {
            raf = requestAnimationFrame(render)
        }

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', onMove)
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
                        'radial-gradient(120% 80% at 30% 10%, rgba(124,58,237,0.22) 0%, transparent 55%), radial-gradient(100% 70% at 80% 60%, rgba(6,182,212,0.16) 0%, transparent 55%), #09090B',
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
