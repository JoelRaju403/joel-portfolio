"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Uniform<T> = { value: T };
interface AuroraUniforms {
  u_time: Uniform<number>;
  u_resolution: Uniform<THREE.Vector2>;
  u_scroll: Uniform<number>;
  u_parallax: Uniform<THREE.Vector2>;
  u_baseA: Uniform<THREE.Color>;
  u_baseB: Uniform<THREE.Color>;
  u_c1: Uniform<THREE.Color>;
  u_c2: Uniform<THREE.Color>;
  u_c3: Uniform<THREE.Color>;
}

function OilPaintingBackground(): React.ReactElement {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current ?? undefined,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        u_scroll: { value: 0 },
        u_parallax: { value: new THREE.Vector2(0, 0) },
        u_baseA: { value: new THREE.Color(0x0b1120) },
        u_baseB: { value: new THREE.Color(0x0e1b3a) },
        u_c1: { value: new THREE.Color(0x29b6f6) },
        u_c2: { value: new THREE.Color(0x5b8cff) },
        u_c3: { value: new THREE.Color(0xb388ff) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform vec2  u_resolution;
        uniform float u_time;
        uniform float u_scroll;
        uniform vec2  u_parallax;
        uniform vec3  u_baseA, u_baseB, u_c1, u_c2, u_c3;

        // -------- utils / noise --------
        float hash21(vec2 p){
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float vnoise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash21(i);
          float b = hash21(i + vec2(1.0,0.0));
          float c = hash21(i + vec2(0.0,1.0));
          float d = hash21(i + vec2(1.0,1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
        }
        float fbm(vec2 p){
          float s=0.0, a=0.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
          for(int i=0;i<4;i++){ s+=a*vnoise(p); p=m*p; a*=0.58; }
          return s;
        }
        mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

        // -------- ribbons --------
        float ribbon(vec2 q, float freq, float thickness, float phase){
          float w = sin(q.x * freq + phase);
          float d = abs(q.y - w);
          return exp(-d*d/(thickness));
        }

        // -------- sparse twinkling stars (screen-space; NO parallax) --------
        vec3 starfield(vec2 frag){
          vec2 cell = vec2(140.0);            // density: bigger = fewer stars
          vec2 gc = frag / cell;
          vec2 id = floor(gc);
          vec2 f  = fract(gc);

          float r      = hash21(id);
          float has    = step(0.78, r);       // ~22% of cells spawn a star
          vec2  jitter = vec2(hash21(id+11.3), hash21(id+27.1));
          vec2  center = jitter;              // within [0,1)
          float radPx  = mix(1.2, 2.6, hash21(id+19.0)); // size (a bit bigger than specks)
          float haloPx = radPx * 3.5;

          vec2  dPx    = (f - center) * cell; // pixel distance
          float dist   = length(dPx);

          float core = 1.0 - smoothstep(radPx*0.6, radPx*1.1, dist);
          float halo = 1.0 - smoothstep(haloPx*0.8, haloPx, dist);

          float twk = 0.80 + 0.25 * sin(u_time*2.1 + r*6.28318);
          vec3 starCol = vec3(0.90, 0.95, 1.0);

          return has * (starCol * (core*twk + halo*0.10));
        }

        void main(){
          vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
          vec2 p = (vUv*2.0-1.0)*aspect + u_parallax;
          float t = u_time*0.35;

          // subtle domain warp
          vec2 warp = vec2(fbm(p*0.6 + t*0.2), fbm(p.yx*0.6 - t*0.2));
          vec2 q1 = rot(radians(25.0)) * (p + 0.25*warp);
          vec2 q2 = rot(radians(-15.0)) * (p + 0.18*warp);
          vec2 q3 = rot(radians(50.0)) * (p + 0.22*warp);

          // ribbons
          float r1 = ribbon(q1, 2.6, 0.06, t*1.2);
          float r2 = ribbon(q2, 2.0, 0.09, -t*0.9 + 1.7);
          float r3 = ribbon(q3, 1.4, 0.12, t*0.6 + 2.3);

          // base gradient
          float g = smoothstep(-1.2, 0.8, p.y + 0.15) * 0.85 + 0.15;
          vec3 base = mix(u_baseA, u_baseB, g);

          // combine
          vec3 color = base;
          color = mix(color, u_c1, r1*0.75);
          color = mix(color, u_c2, r2*0.65);
          color = mix(color, u_c3, r3*0.60);

          // center lift
          float vign = 1.0 - smoothstep(0.75, 1.08, length(p));
          color += 0.05*vign;

          // add stars (screen-space)
          vec3 stars = starfield(gl_FragCoord.xy);
          color += stars * 0.9;

          // tone
          color = pow(color, vec3(0.95));
          color = clamp(color, 0.0, 1.0);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const uniforms = material.uniforms as unknown as AuroraUniforms;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // parallax (stars ignore this)
    let scrollY = window.scrollY || 0;
    const targetParallax = new THREE.Vector2();
    const parallax = new THREE.Vector2();

    const onMouseMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      targetParallax.set((mx - 0.5) * 0.02, (my - 0.5) * -0.012);
    };
    const onScroll = () => {
      scrollY = window.scrollY || 0;
      uniforms.u_scroll.value = scrollY;
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    const start = performance.now();
    let raf = 0;
    const render = () => {
      const t = (performance.now() - start) / 1000;
      uniforms.u_time.value = t;

      const drift = Math.sin(scrollY * 0.001 + t * 0.05) * 0.006;
      targetParallax.y += drift * 0.01;
      parallax.lerp(targetParallax, 0.06);
      uniforms.u_parallax.value.copy(parallax);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default OilPaintingBackground;
export { OilPaintingBackground };
