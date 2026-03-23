"use client";

import { useEffect, useRef } from "react";

// Major financial hubs [lon, lat]
const CITIES: [number, number][] = [
  [-74.0, 40.7],   // New York
  [-0.12, 51.5],   // London
  [2.35, 48.86],   // Paris
  [13.4, 52.5],    // Berlin
  [55.3, 25.2],    // Dubai
  [46.7, 24.7],    // Riyadh
  [39.6, 21.4],    // Jeddah
  [103.8, 1.35],   // Singapore
  [121.5, 31.2],   // Shanghai
  [139.7, 35.7],   // Tokyo
  [116.4, 39.9],   // Beijing
  [72.8, 19.1],    // Mumbai
  [77.2, 28.6],    // Delhi
  [31.2, 30.05],   // Cairo
  [-87.6, 41.8],   // Chicago
  [-118.2, 34.0],  // Los Angeles
  [-122.4, 37.77], // San Francisco
  [37.6, 55.75],   // Moscow
  [28.97, 41.0],   // Istanbul
  [4.9, 52.37],    // Amsterdam
  [8.54, 47.37],   // Zurich
  [151.2, -33.87], // Sydney
  [126.9, 37.56],  // Seoul
  [-43.18, -22.9], // São Paulo
  [18.42, -33.9],  // Cape Town
  [36.82, -1.29],  // Nairobi
  [-79.4, 43.7],   // Toronto
  [100.5, 13.7],   // Bangkok
  [3.42, 6.45],    // Lagos
  [49.57, 29.37],  // Riyadh 2
];

interface Connection {
  from: number;
  to: number;
  progress: number;
  speed: number;
  alpha: number;
}

function project(
  lat: number,
  lon: number,
  centerLon: number,
  cx: number,
  cy: number,
  r: number
): { x: number; y: number; z: number } | null {
  const phi = (lat * Math.PI) / 180;
  const lambda = ((lon - centerLon) * Math.PI) / 180;
  const cosLam = Math.cos(lambda);
  const sinLam = Math.sin(lambda);
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const z = cosPhi * cosLam;
  if (z < 0) return null;
  return {
    x: cx + r * cosPhi * sinLam,
    y: cy - r * sinPhi,
    z,
  };
}

export default function WorldGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let centerLon = 35;

    const connections: Connection[] = Array.from({ length: 10 }, () => ({
      from: Math.floor(Math.random() * CITIES.length),
      to: Math.floor(Math.random() * CITIES.length),
      progress: Math.random(),
      speed: 0.0025 + Math.random() * 0.003,
      alpha: 0.5 + Math.random() * 0.5,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      if (!ctx || !canvas) return;
      centerLon += 0.025;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) * 0.4;

      ctx.clearRect(0, 0, W, H);

      // ── Graticule grid ───────────────────────────────────────────
      ctx.lineWidth = 0.4;

      for (let lat = -80; lat <= 80; lat += 15) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 2) {
          const p = project(lat, lon, centerLon, cx, cy, r);
          if (!p) { first = true; continue; }
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
          first = false;
        }
        ctx.strokeStyle =
          lat === 0
            ? "rgba(249,115,22,0.18)"
            : "rgba(249,115,22,0.055)";
        ctx.stroke();
      }

      for (let lon = -180; lon <= 165; lon += 15) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = project(lat, lon, centerLon, cx, cy, r);
          if (!p) { first = true; continue; }
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
          first = false;
        }
        ctx.strokeStyle = "rgba(249,115,22,0.05)";
        ctx.stroke();
      }

      // ── Globe outline ────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(249,115,22,0.22)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Soft atmosphere glow
      const atmos = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.18);
      atmos.addColorStop(0, "rgba(249,115,22,0.06)");
      atmos.addColorStop(0.5, "rgba(251,191,36,0.03)");
      atmos.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = atmos;
      ctx.fill();

      // Inner dim fill
      const inner = ctx.createRadialGradient(cx, cy * 0.8, 0, cx, cy, r);
      inner.addColorStop(0, "rgba(249,115,22,0.04)");
      inner.addColorStop(0.6, "rgba(0,0,0,0)");
      inner.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = inner;
      ctx.fill();

      // ── Connection arcs ──────────────────────────────────────────
      connections.forEach((conn) => {
        conn.progress += conn.speed;
        if (conn.progress >= 1) {
          conn.progress = 0;
          conn.from = Math.floor(Math.random() * CITIES.length);
          do {
            conn.to = Math.floor(Math.random() * CITIES.length);
          } while (conn.to === conn.from);
          conn.alpha = 0.45 + Math.random() * 0.55;
        }

        const [fLon, fLat] = CITIES[conn.from];
        const [tLon, tLat] = CITIES[conn.to];
        const steps = 60;
        const t = conn.progress;
        const fade = Math.sin(t * Math.PI);

        // Full arc (dim)
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= steps; i++) {
          const s = i / steps;
          const p = project(
            fLat + (tLat - fLat) * s,
            fLon + (tLon - fLon) * s,
            centerLon, cx, cy, r
          );
          if (!p) { first = true; continue; }
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
          first = false;
        }
        ctx.strokeStyle = `rgba(251,191,36,${0.08 * conn.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Animated trail
        ctx.beginPath();
        first = true;
        const trailStart = Math.max(0, t - 0.25);
        for (let i = 0; i <= steps; i++) {
          const s = i / steps;
          if (s < trailStart || s > t) continue;
          const p = project(
            fLat + (tLat - fLat) * s,
            fLon + (tLon - fLon) * s,
            centerLon, cx, cy, r
          );
          if (!p) { first = true; continue; }
          first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
          first = false;
        }
        ctx.strokeStyle = `rgba(251,191,36,${0.7 * fade * conn.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Particle head
        const headP = project(
          fLat + (tLat - fLat) * t,
          fLon + (tLon - fLon) * t,
          centerLon, cx, cy, r
        );
        if (headP) {
          const hGlow = ctx.createRadialGradient(headP.x, headP.y, 0, headP.x, headP.y, 10);
          hGlow.addColorStop(0, `rgba(255,220,80,${0.9 * fade})`);
          hGlow.addColorStop(0.3, `rgba(251,191,36,${0.5 * fade})`);
          hGlow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(headP.x, headP.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = hGlow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(headP.x, headP.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,235,100,${fade})`;
          ctx.fill();
        }
      });

      // ── City nodes ───────────────────────────────────────────────
      CITIES.forEach(([lon, lat], i) => {
        const p = project(lat, lon, centerLon, cx, cy, r);
        if (!p) return;

        const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0018 + i * 0.7);

        // Glow ring
        const cGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
        cGlow.addColorStop(0, `rgba(249,115,22,${0.45 * pulse * p.z})`);
        cGlow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = cGlow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8 * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,191,36,${(0.6 + 0.4 * pulse) * p.z})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.55 }}
    />
  );
}
