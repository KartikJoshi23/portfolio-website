/* ==========================================================
 * UTILS.TS — Blueprint Section 3.4.4
 * cn() utility for conditional class merging
 * ========================================================== */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
