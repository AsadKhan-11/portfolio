"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useHasMounted, useMediaQuery } from "./useClient";

/*
  Full-viewport GLSL field. Domain-warped fbm noise drifting slowly
  through the brand duotone (vermillion → electric cyan), kept very
  dark so type stays legible. The cursor pulls a soft warm bloom.
*/

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uAspect;
  uniform float uIntro;
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

  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p  = vec2((uv.x - 0.5) * uAspect, uv.y - 0.5) * 2.2;

    float t = uTime * 0.045;

    // two-step domain warp for organic flow
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(3.7, 1.3) - t * 0.6));
    vec2 r = vec2(
      fbm(p + 2.2 * q + vec2(1.7, 9.2) + t * 1.1),
      fbm(p + 2.2 * q + vec2(8.3, 2.8) - t * 0.8)
    );
    float f = fbm(p + 2.0 * r);

    // remap to 0..1 with a soft shoulder
    float band = smoothstep(-0.55, 0.85, f);

    vec3 flame = vec3(1.0, 0.36, 0.21);
    vec3 volt  = vec3(0.31, 0.94, 1.0);

    // mix the duotone by the warp field, weighted toward flame
    vec3 col = mix(volt, flame, smoothstep(0.15, 0.9, band + r.x * 0.25));

    // keep it whisper-quiet against the near-black canvas
    float energy = pow(band, 2.6) * 0.16;
    col *= energy;

    // cursor bloom
    vec2 m = vec2((uMouse.x - 0.5) * uAspect, uMouse.y - 0.5) * 2.2;
    float d = length(p - m);
    col += flame * exp(-d * 2.1) * 0.055;
    col += volt  * exp(-d * 3.4) * 0.02;

    // vertical falloff so the top of each viewport stays clean
    col *= smoothstep(1.15, 0.15, abs(uv.y - 0.45));

    // intro swell
    col *= uIntro;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Field() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const smoothed = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAspect: { value: 1 },
      uIntro: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    const d = Math.min(delta, 0.05);

    m.uniforms.uTime.value += d;
    m.uniforms.uAspect.value = size.width / size.height;

    // ease the pointer so the bloom trails rather than snaps
    smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.045;
    smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.045;
    m.uniforms.uMouse.value.set(smoothed.current.x, smoothed.current.y);

    // fade the field up once on mount
    m.uniforms.uIntro.value = Math.min(1, m.uniforms.uIntro.value + d * 0.5);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ShaderField() {
  const mounted = useHasMounted();
  // Respect reduced-motion and skip the GPU work entirely on those machines.
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (mounted && reduceMotion) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 55% at 30% 20%, rgba(255,92,53,0.10), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(79,240,255,0.06), transparent 60%)",
        }}
      />
    );
  }

  // The WebGL canvas is client-only; nothing to render during SSR.
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <Field />
      </Canvas>
    </div>
  );
}
