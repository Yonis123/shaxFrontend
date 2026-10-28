import type { CSSProperties } from "react"

// Small deterministic pseudo-random number in [0, 1) so each pebble keeps its shape between renders.
const rand = (seed: number, n: number) => {
    const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453
    return x - Math.floor(x)
}

// An uneven, slightly squashed outline and a random tilt, like a real pebble.
export function pebbleStyle(seed: number): CSSProperties {
    const r = (n: number) => Math.round(38 + rand(seed, n) * 24) // 38%–62%
    return {
        borderRadius: `${r(1)}% ${r(2)}% ${r(3)}% ${r(4)}% / ${r(5)}% ${r(6)}% ${r(7)}% ${r(8)}%`,
        "--rot": `${Math.round(rand(seed, 9) * 360)}deg`,
        "--sx": (0.9 + rand(seed, 10) * 0.14).toFixed(3),
    } as CSSProperties
}
