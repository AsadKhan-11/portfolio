"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHasMounted, useMediaQuery } from "./useClient";

/*
  The hero's 3D stage: a wireframe terrain flowing under the headline,
  drawn in bone hairlines with flame catching the crests. The ground is
  calmer down the middle, so a clear "road" runs toward the horizon
  under the type. One mesh, one draw call.
*/

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElev;
  varying float vX;
  varying vec2  vUv;

  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 p = position;
    float t = uTime * 0.16;

    float e = snoise(p.xy * 0.20 + vec2(t, t * 0.55)) * 0.85
            + snoise(p.xy * 0.52 - vec2(t * 0.7, t * 0.35)) * 0.32;

    /* Quiet channel down the middle — the headline's runway */
    e *= mix(0.18, 1.0, smoothstep(0.6, 5.2, abs(p.x)));
    /* Nothing lifts right at the near edge, keeping the floor grounded */
    e *= smoothstep(0.0, 0.18, uv.y);

    p.z += e;
    vElev = e;
    vX = position.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uIntro;
  varying float vElev;
  varying float vX;
  varying vec2  vUv;

  void main() {
    vec3 bone  = vec3(0.956, 0.945, 0.918);
    vec3 flame = vec3(1.0, 0.361, 0.208);

    /* Crests catch the forge light */
    float crest = smoothstep(0.3, 1.05, vElev);
    vec3 col = mix(bone, flame, crest * 0.9);

    /* Lines dissolve toward the horizon and soften near the camera */
    float depth = 1.0 - vUv.y;
    float alpha = mix(0.16, 0.0, smoothstep(0.25, 0.95, vUv.y));
    alpha *= smoothstep(0.0, 0.08, vUv.y);
    alpha += crest * 0.10 * depth;

    /* The runway under the type stays near-silent so copy reads clean */
    alpha *= mix(0.3, 1.0, smoothstep(1.4, 6.0, abs(vX)));

    gl_FragColor = vec4(col, alpha * uIntro);
  }
`;

function Terrain() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: 0 },
    }),
    []
  );

  const geometry = useMemo(() => new THREE.PlaneGeometry(30, 16, 130, 60), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += d;
      matRef.current.uniforms.uIntro.value = Math.min(
        1,
        matRef.current.uniforms.uIntro.value + d * 0.5
      );
    }
    /* The whole floor leans a breath toward the cursor */
    const g = groupRef.current;
    if (g) {
      smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.04;
      smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.04;
      g.rotation.y = smoothed.current.x * 0.05;
      g.rotation.x = smoothed.current.y * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2.18, 0, 0]}
        position={[0, -2.1, -3.2]}
      >
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          wireframe
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroField() {
  const mounted = useHasMounted();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  /* The hero scrolls away; stop paying for frames once it has */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  // Client-only, and skipped entirely for reduced-motion machines —
  // the static ShaderField fallback already carries the backdrop.
  if (!mounted || reduceMotion) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0.6, 5.4], fov: 52 }}
      >
        <Terrain />
      </Canvas>
    </div>
  );
}
