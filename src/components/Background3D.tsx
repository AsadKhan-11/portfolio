"use client";

import { useRef, useEffect, useCallback } from "react";

/* ─── 3D Math Helpers ─── */
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function rotateX(p: Vec3, a: number): Vec3 {
  const cos = Math.cos(a),
    sin = Math.sin(a);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}
function rotateY(p: Vec3, a: number): Vec3 {
  const cos = Math.cos(a),
    sin = Math.sin(a);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
}
function rotateZ(p: Vec3, a: number): Vec3 {
  const cos = Math.cos(a),
    sin = Math.sin(a);
  return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos, z: p.z };
}
function project(
  p: Vec3,
  cx: number,
  cy: number,
  fov: number
): { x: number; y: number; scale: number } {
  const scale = fov / (fov + p.z);
  return { x: cx + p.x * scale, y: cy + p.y * scale, scale };
}

/* ─── Wireframe shape definitions ─── */
function createIcosahedron(radius: number): {
  vertices: Vec3[];
  edges: [number, number][];
} {
  const t = (1 + Math.sqrt(5)) / 2;
  const r = radius / Math.sqrt(1 + t * t);
  const raw: Vec3[] = [
    { x: -1, y: t, z: 0 },
    { x: 1, y: t, z: 0 },
    { x: -1, y: -t, z: 0 },
    { x: 1, y: -t, z: 0 },
    { x: 0, y: -1, z: t },
    { x: 0, y: 1, z: t },
    { x: 0, y: -1, z: -t },
    { x: 0, y: 1, z: -t },
    { x: t, y: 0, z: -1 },
    { x: t, y: 0, z: 1 },
    { x: -t, y: 0, z: -1 },
    { x: -t, y: 0, z: 1 },
  ];
  const vertices = raw.map((v) => ({
    x: v.x * r,
    y: v.y * r,
    z: v.z * r,
  }));
  const edges: [number, number][] = [
    [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
    [1, 5], [1, 7], [1, 8], [1, 9],
    [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
    [3, 4], [3, 6], [3, 8], [3, 9],
    [4, 5], [4, 9], [4, 11],
    [5, 9], [5, 11],
    [6, 7], [6, 8], [6, 10],
    [7, 8], [7, 10],
    [8, 9],
    [10, 11],
  ];
  return { vertices, edges };
}

function createOctahedron(radius: number): {
  vertices: Vec3[];
  edges: [number, number][];
} {
  const r = radius;
  const vertices: Vec3[] = [
    { x: 0, y: -r, z: 0 },
    { x: r, y: 0, z: 0 },
    { x: 0, y: 0, z: r },
    { x: -r, y: 0, z: 0 },
    { x: 0, y: 0, z: -r },
    { x: 0, y: r, z: 0 },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [5, 1], [5, 2], [5, 3], [5, 4],
    [1, 2], [2, 3], [3, 4], [4, 1],
  ];
  return { vertices, edges };
}

interface FloatingShape {
  vertices: Vec3[];
  edges: [number, number][];
  rotSpeed: Vec3;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  color: string;
  opacity: number;
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    let animationId: number;
    let w = 0,
      h = 0;
    let scrollY = 0;
    const fov = 500;
    const gridSpacing = 80;
    const gridExtent = 14;
    const shapes: FloatingShape[] = [];

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createShapes = () => {
      shapes.length = 0;
      const configs = [
        { factory: createIcosahedron, radius: 35, orbit: 250, speed: 0.12, color: "129, 140, 248", opacity: 0.3 },
        { factory: createOctahedron, radius: 28, orbit: 350, speed: -0.08, color: "34, 211, 238", opacity: 0.2 },
        { factory: createIcosahedron, radius: 22, orbit: 200, speed: 0.18, color: "99, 102, 241", opacity: 0.18 },
        { factory: createOctahedron, radius: 18, orbit: 420, speed: -0.06, color: "129, 140, 248", opacity: 0.12 },
        { factory: createIcosahedron, radius: 40, orbit: 300, speed: 0.1, color: "34, 211, 238", opacity: 0.15 },
        { factory: createOctahedron, radius: 25, orbit: 180, speed: 0.14, color: "99, 102, 241", opacity: 0.12 },
      ];

      configs.forEach((cfg, i) => {
        const { vertices, edges } = cfg.factory(cfg.radius);
        shapes.push({
          vertices,
          edges,
          rotSpeed: {
            x: 0.003 + i * 0.0008,
            y: 0.004 + i * 0.0015,
            z: 0.002 + i * 0.0007,
          },
          orbitRadius: cfg.orbit,
          orbitSpeed: cfg.speed,
          orbitOffset: (i * Math.PI * 2) / configs.length,
          color: cfg.color,
          opacity: cfg.opacity,
        });
      });
    };

    let time = 0;

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, w, h);

      // Parallax center shifts with scroll
      const totalHeight = document.documentElement.scrollHeight - h;
      const scrollFraction = totalHeight > 0 ? scrollY / totalHeight : 0;
      const cx = w / 2 + Math.sin(scrollFraction * Math.PI) * w * 0.05;
      const cy = h * 0.55 - scrollFraction * h * 0.15;

      // Global opacity fades subtly as you scroll deep
      const globalAlpha = Math.max(0.3, 1 - scrollFraction * 0.5);

      /* ─── Draw 3D perspective grid ─── */
      const gridTilt = -0.85;
      const gridYOffset = 120 + scrollFraction * 60;
      const scrollPhase = (time * 10) % gridSpacing;

      ctx.lineWidth = 0.5;
      ctx.globalAlpha = globalAlpha;

      // Horizontal grid lines
      for (let i = -2; i <= gridExtent; i++) {
        const zPos = i * gridSpacing + scrollPhase;
        const leftPt: Vec3 = { x: -gridExtent * gridSpacing, y: 0, z: zPos };
        const rightPt: Vec3 = { x: gridExtent * gridSpacing, y: 0, z: zPos };

        const rl = rotateX(leftPt, gridTilt);
        const rr = rotateX(rightPt, gridTilt);

        const pl = project({ x: rl.x, y: rl.y + gridYOffset, z: rl.z + 200 }, cx, cy, fov);
        const pr = project({ x: rr.x, y: rr.y + gridYOffset, z: rr.z + 200 }, cx, cy, fov);

        const depth = Math.max(0, 1 - zPos / (gridExtent * gridSpacing));
        const alpha = depth * 0.1;

        if (alpha > 0.003) {
          ctx.beginPath();
          ctx.moveTo(pl.x, pl.y);
          ctx.lineTo(pr.x, pr.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.stroke();
        }
      }

      // Vertical grid lines
      for (let i = -gridExtent; i <= gridExtent; i++) {
        const xPos = i * gridSpacing;
        const nearPt: Vec3 = { x: xPos, y: 0, z: -gridSpacing };
        const farPt: Vec3 = { x: xPos, y: 0, z: gridExtent * gridSpacing };

        const rn = rotateX(nearPt, gridTilt);
        const rf = rotateX(farPt, gridTilt);

        const pn = project({ x: rn.x, y: rn.y + gridYOffset, z: rn.z + 200 }, cx, cy, fov);
        const pf = project({ x: rf.x, y: rf.y + gridYOffset, z: rf.z + 200 }, cx, cy, fov);

        const dist = Math.abs(i) / gridExtent;
        const alpha = (1 - dist) * 0.08;

        if (alpha > 0.003) {
          ctx.beginPath();
          ctx.moveTo(pn.x, pn.y);
          ctx.lineTo(pf.x, pf.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.stroke();
        }
      }

      /* ─── Horizon glow ─── */
      const horizonY = cy + gridYOffset * 0.35;
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 2, 0, horizonY + 40);
      horizonGrad.addColorStop(0, "rgba(99, 102, 241, 0.12)");
      horizonGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.04)");
      horizonGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 2, w, 42);

      /* ─── Ambient light beams ─── */
      for (let b = 0; b < 3; b++) {
        const beamX = cx + Math.sin(time * 0.25 + b * 2.1) * w * 0.35;
        const beamGrad = ctx.createRadialGradient(beamX, h, 0, beamX, h * 0.3, h * 0.8);
        beamGrad.addColorStop(0, `rgba(99, 102, 241, ${0.025 + Math.sin(time + b) * 0.01})`);
        beamGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = beamGrad;
        ctx.fillRect(beamX - w * 0.3, 0, w * 0.6, h);
      }

      /* ─── Floating wireframe shapes ─── */
      shapes.forEach((shape) => {
        const orbAngle = time * shape.orbitSpeed + shape.orbitOffset;
        const orbX = Math.cos(orbAngle) * shape.orbitRadius;
        const orbZ = Math.sin(orbAngle) * shape.orbitRadius * 0.5 + 300;
        const orbY = Math.sin(orbAngle * 1.5) * 50;

        const projected = shape.vertices.map((v) => {
          let p = rotateX(v, time * shape.rotSpeed.x);
          p = rotateY(p, time * shape.rotSpeed.y);
          p = rotateZ(p, time * shape.rotSpeed.z);
          p.x += orbX;
          p.y += orbY;
          p.z += orbZ;
          return project(p, cx, cy, fov);
        });

        ctx.lineWidth = 1;
        shape.edges.forEach(([a, b]) => {
          const pa = projected[a];
          const pb = projected[b];
          const avgScale = (pa.scale + pb.scale) / 2;
          const alpha = shape.opacity * Math.min(avgScale, 1);

          if (alpha > 0.008) {
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = `rgba(${shape.color}, ${alpha})`;
            ctx.stroke();
          }
        });

        projected.forEach((p) => {
          const alpha = shape.opacity * 1.5 * Math.min(p.scale, 1);
          if (alpha > 0.015) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${shape.color}, ${alpha})`;
            ctx.fill();
          }
        });
      });

      /* ─── Floating particles ─── */
      for (let i = 0; i < 50; i++) {
        const seed = i * 137.508;
        const px = cx + Math.sin(time * 0.15 + seed) * w * 0.48 + Math.cos(time * 0.08 + seed * 0.5) * 60;
        const py = cy + Math.cos(time * 0.12 + seed * 0.7) * h * 0.45 + Math.sin(time * 0.06 + seed * 0.3) * 40;
        const pAlpha = 0.12 + Math.sin(time * 0.4 + seed) * 0.08;
        const pSize = 0.6 + Math.sin(seed) * 0.4;

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${Math.max(0, pAlpha)})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    createShapes();
    draw();

    const resizeHandler = () => {
      resize();
      createShapes();
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="bg3d-canvas"
        aria-hidden="true"
      />
      {/* Depth fog overlays */}
      <div className="bg3d-fog" aria-hidden="true">
        <div className="bg3d-fog-top" />
        <div className="bg3d-fog-bottom" />
        <div className="bg3d-fog-vignette" />
      </div>
    </>
  );
}
