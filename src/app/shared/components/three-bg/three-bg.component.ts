import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  NgZone,
} from '@angular/core';
import { GsapService } from '../../../core/animation/gsap.service';

/**
 * Ambient, site-wide three.js particle wave. Renders to a single fixed,
 * full-viewport canvas that sits behind all page content, so the effect is
 * present on every section — not just the hero — while staying subtle.
 *
 * - three is imported dynamically so it never blocks first paint
 * - wave displacement runs entirely in the vertex shader (no per-frame CPU work)
 * - pauses when the tab is hidden; renders one static frame under
 *   prefers-reduced-motion; fully disposes on destroy
 */
@Component({
  selector: 'app-three-bg',
  standalone: true,
  template: `
    <canvas
      class="fixed inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      style="pointer-events: none; z-index: -1;
             -webkit-mask-image: radial-gradient(130% 95% at 50% 78%, #000 0%, rgba(0,0,0,0.45) 48%, transparent 80%);
             mask-image: radial-gradient(130% 95% at 50% 78%, #000 0%, rgba(0,0,0,0.45) 48%, transparent 80%);"
      aria-hidden="true"
    ></canvas>
  `,
})
export class ThreeBgComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private readonly gsapSvc = inject(GsapService);

  private rafId = 0;
  private running = false;
  private disposed = false;
  private cleanup: (() => void) | null = null;

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    this.zone.runOutsideAngular(() => void this.init());
  }

  private async init() {
    const THREE = await import('three');
    if (this.disposed) return;

    const canvas = this.el.nativeElement.querySelector('canvas') as HTMLCanvasElement;
    const reduced = this.gsapSvc.prefersReducedMotion();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 1.7, 9);
    camera.lookAt(0, -0.4, 0);

    // ── Particle grid ──
    const COLS = 120;
    const ROWS = 70;
    const W = 32;
    const D = 22;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i * 3] = (c / (COLS - 1) - 0.5) * W;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r / (ROWS - 1) - 0.5) * D;
        seeds[i] = Math.random();
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#5E97A6') },
        uColorB: { value: new THREE.Color('#93CBD6') },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        attribute float aSeed;
        varying float vMix;
        varying float vFade;
        void main() {
          vec3 p = position;
          float wave =
            sin(p.x * 0.5 + uTime * 0.5) * 0.5 +
            cos(p.z * 0.75 + uTime * 0.4) * 0.32 +
            sin((p.x + p.z) * 0.3 + uTime * 0.25) * 0.28;
          p.y += wave;
          vMix = aSeed;
          // dissolve toward the side/far edges so it reads as a soft field
          float edgeX = smoothstep(16.0, 7.0, abs(p.x));
          float edgeZ = smoothstep(12.0, 1.0, abs(p.z));
          vFade = edgeX * edgeZ * (0.4 + 0.6 * aSeed);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.4 + aSeed * 2.4) * (320.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vMix;
        varying float vFade;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.08, d) * vFade * 0.55;
          if (alpha < 0.01) discard;
          vec3 col = mix(uColorA, uColorB, vMix);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    points.position.y = -1.8;
    scene.add(points);

    // ── Sizing (viewport-locked, since the canvas is fixed) ──
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Mouse parallax (desktop only) ──
    let targetX = 0;
    let targetY = 0;
    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine && !reduced) window.addEventListener('pointermove', onMove, { passive: true });

    // ── Render loop ──
    const t0 = performance.now();
    const tick = () => {
      if (!this.running) return;
      mat.uniforms['uTime'].value = (performance.now() - t0) / 1000;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (1.7 - targetY - camera.position.y) * 0.04;
      camera.lookAt(0, -0.4, 0);
      renderer.render(scene, camera);
      this.rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (this.running || reduced || this.disposed) return;
      this.running = true;
      this.rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      this.running = false;
      cancelAnimationFrame(this.rafId);
    };

    // Static frame for reduced motion, animated otherwise
    renderer.render(scene, camera);
    canvas.style.opacity = '0.5';
    if (!reduced) start();

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    this.cleanup = () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }

  ngOnDestroy() {
    this.disposed = true;
    this.cleanup?.();
  }
}
