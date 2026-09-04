"use client";

import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NormalBlending,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Points,
  PointsMaterial,
  Raycaster,
  Scene,
  ShaderMaterial,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  WireframeGeometry,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { useSiteSettings } from "@/lib/site-settings";

const ACID = "#d9ff45";
const BLUE = "#79a7ff";
/* Decorative quality is intentionally capped; the hero should not compete with page content. */
const DUST_COUNT = 760;
const DUST_SIZE = 0.034;
/* Outer diameter of the widest ring — the framing keeps it at FRAME_FILL times the anchor box. */
const OBJECT_SPAN = 5.64;
const FRAME_FILL = 1.12;
/* Camera distance the dust field was authored for; it scales from here. */
const REFERENCE_Z = 13;

/* Layout position of an element inside root, ignoring any transform on the way up. */
function layoutCenter(element: HTMLElement, root: HTMLElement) {
  let x = element.offsetWidth / 2;
  let y = element.offsetHeight / 2;
  let node: HTMLElement | null = element;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/* Trail samples live in the group's local space, so the streak sticks to the surface and spins with it. */
const TRAIL_LIFE = 2;
/* Cosine of the smallest angular gap between two samples — closer moves just refresh the last one. */
const TRAIL_STEP_COS = Math.cos(0.032);

const GLOW_VERTEX = `
  varying vec3 vWorldNormal;
  varying vec3 vObjNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vObjNormal = normalize(normal);
    vViewDir = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

/* Trail shell: only the streak. Blending switches per theme, because additive does nothing on a light page. */
const trailFragment = (count: number) => `
  #define TRAIL ${count}
  uniform vec3 uColor;
  uniform vec3 uHotColor;
  uniform vec3 uTrail[TRAIL];
  uniform float uTrailAmp[TRAIL];
  uniform float uGain;
  uniform float uSharp;
  varying vec3 vObjNormal;
  void main() {
    vec3 objNormal = normalize(vObjNormal);
    float trail = 0.0;
    for (int i = 0; i < TRAIL; i++) {
      trail += pow(max(dot(objNormal, uTrail[i]), 0.0), uSharp) * uTrailAmp[i];
    }
    trail = min(trail, 1.3) * uGain;
    if (trail <= 0.003) discard;
    gl_FragColor = vec4(mix(uColor, uHotColor, clamp(trail * 1.3, 0.0, 1.0)), trail);
  }
`;

/* Rim and bloom shells: fresnel only, always additive. */
const BLOOM_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uHover;
  uniform float uBase;
  uniform float uGain;
  uniform float uRim;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vWorldNormal), normalize(vViewDir)), 0.0), uRim);
    float alpha = fresnel * (uBase + uGain * uHover);
    if (alpha <= 0.002) discard;
    gl_FragColor = vec4(uColor * (0.6 + 0.5 * uHover), alpha);
  }
`;

/* Faceted core, wireframe shell, two orbit rings and a dust field. */
export function HeroObject() {
  const { theme } = useSiteSettings();
  const hostRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<((light: boolean) => void) | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 720px)").matches;
    const pixelRatioCap = compact ? 0.9 : 1.1;
    const antialias = !compact && window.devicePixelRatio <= 1.5;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias, powerPreference: "high-performance" });
    } catch {
      host.dataset.unsupported = "true";
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.className = "hero-object__canvas";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    /* Metal needs something to reflect, otherwise every facet renders black. */
    const pmrem = new PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    scene.environmentIntensity = 0.42;

    const camera = new PerspectiveCamera(38, 1, 0.1, 200);
    camera.position.set(0, 0, REFERENCE_Z);

    const group = new Group();
    scene.add(group);
    const anchor = new Vector3();

    const coreGeometry = new IcosahedronGeometry(1.7, 1);
    const coreMaterial = new MeshStandardMaterial({ color: "#1a2434", emissive: "#111a08", metalness: 0.88, roughness: 0.22, flatShading: true });
    const core = new Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wireGeometry = new WireframeGeometry(coreGeometry);
    const wireMaterial = new LineBasicMaterial({ color: new Color(ACID), transparent: true, opacity: 0.46 });
    const wire = new LineSegments(wireGeometry, wireMaterial);
    wire.scale.setScalar(1.008);
    group.add(wire);

    const glowGeometry = new IcosahedronGeometry(1.12, compact ? 1 : 2);
    const glowMaterial = new MeshBasicMaterial({ color: new Color(ACID), transparent: true, opacity: 0.14, blending: AdditiveBlending, depthWrite: false });
    group.add(new Mesh(glowGeometry, glowMaterial));

    /* Two atmosphere shells: the inner one carries the cursor trail, the outer one is a hover-only bloom. */
    const trailLength = compact ? 10 : 20;
    const trailDirs = Array.from({ length: trailLength }, () => new Vector3(0, 0, 1));
    const trailAmp = new Float32Array(trailLength);
    const glowShellGeometry = new IcosahedronGeometry(1, compact ? 3 : 4);

    const addShell = (radius: number, material: ShaderMaterial) => {
      const mesh = new Mesh(glowShellGeometry, material);
      mesh.scale.setScalar(radius);
      mesh.renderOrder = 2;
      group.add(mesh);
      return material;
    };

    const rimShellMaterial = addShell(1.94, new ShaderMaterial({
      uniforms: {
        uColor: { value: new Color(ACID) },
        uHover: { value: 0 },
        uBase: { value: 0.14 },
        uGain: { value: 0.22 },
        uRim: { value: 3.2 },
      },
      vertexShader: GLOW_VERTEX,
      fragmentShader: BLOOM_FRAGMENT,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    }));

    const trailShellMaterial = addShell(1.86, new ShaderMaterial({
      uniforms: {
        uColor: { value: new Color(ACID) },
        uHotColor: { value: new Color("#f4ffd6") },
        uTrail: { value: trailDirs },
        uTrailAmp: { value: trailAmp },
        uGain: { value: 1.1 },
        uSharp: { value: 300 },
      },
      vertexShader: GLOW_VERTEX,
      fragmentShader: trailFragment(trailLength),
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    }));

    const bloomShellMaterial = addShell(2.28, new ShaderMaterial({
      uniforms: {
        uColor: { value: new Color(ACID) },
        uHover: { value: 0 },
        uBase: { value: 0 },
        uGain: { value: 0.16 },
        uRim: { value: 3.4 },
      },
      vertexShader: GLOW_VERTEX,
      fragmentShader: BLOOM_FRAGMENT,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    }));

    const ringGeometry = new TorusGeometry(2.45, 0.012, 8, compact ? 96 : 144);
    const ringAMaterial = new MeshBasicMaterial({ color: new Color(ACID), transparent: true, opacity: 0.42 });
    const ringBMaterial = new MeshBasicMaterial({ color: new Color(BLUE), transparent: true, opacity: 0.3 });
    const ringA = new Mesh(ringGeometry, ringAMaterial);
    ringA.rotation.set(Math.PI / 2.4, 0.2, 0);
    const ringB = new Mesh(ringGeometry, ringBMaterial);
    ringB.rotation.set(0.62, 1.1, 0.4);
    ringB.scale.setScalar(1.15);
    group.add(ringA, ringB);

    /* Star field: wide enough to cover the whole hero, centred on the viewport rather than the planet. */
    const dustCount = compact ? 240 : DUST_COUNT;
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      const radius = 4.2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * 1.3;
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.68;
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.8;
    }
    const dustGeometry = new BufferGeometry();
    dustGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    const dustMaterial = new PointsMaterial({ color: new Color(ACID), size: DUST_SIZE, transparent: true, opacity: 0.55, blending: AdditiveBlending, depthWrite: false });
    const dust = new Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const ambient = new AmbientLight(0x93a7bd, 0.9);
    const keyLight = new PointLight(new Color(ACID), 95, 0, 2);
    keyLight.position.set(3.4, 2.6, 4.2);
    const rimLight = new PointLight(new Color(BLUE), 70, 0, 2);
    rimLight.position.set(-4.2, -2.4, 2.6);
    scene.add(ambient, keyLight, rimLight);

    /* Hover multiplies these, so they are the reference the render loop reads back. */
    const base = { wire: 0.46, dust: 0.55, glow: 0.16, ringA: 0.42, ringB: 0.3, key: 95 };

    const applyTheme = (light: boolean) => {
      coreMaterial.color.set(light ? "#93a284" : "#1a2434");
      coreMaterial.emissive.set(light ? "#5c6f2b" : "#111a08");
      coreMaterial.metalness = light ? 0.6 : 0.88;
      coreMaterial.roughness = light ? 0.28 : 0.22;
      scene.environmentIntensity = light ? 0.7 : 0.42;
      wireMaterial.color.set(light ? "#43570b" : ACID);
      ringAMaterial.color.set(light ? "#5f7a00" : ACID);
      ringBMaterial.color.set(light ? "#2f56b5" : BLUE);
      dustMaterial.color.set(light ? "#4f6600" : ACID);
      dustMaterial.blending = light ? NormalBlending : AdditiveBlending;
      ambient.intensity = light ? 1.7 : 0.9;
      rimShellMaterial.uniforms.uColor.value.set(light ? "#6f8a00" : ACID);
      bloomShellMaterial.uniforms.uColor.value.set(light ? "#7d9c00" : ACID);
      /* Additive glow washes out over a light background, so the shells run weaker there. */
      rimShellMaterial.uniforms.uBase.value = light ? 0.08 : 0.14;
      rimShellMaterial.uniforms.uGain.value = light ? 0.14 : 0.22;
      bloomShellMaterial.uniforms.uGain.value = light ? 0.07 : 0.16;
      /* The streak paints instead of adding light when the page is bright. */
      trailShellMaterial.blending = light ? NormalBlending : AdditiveBlending;
      trailShellMaterial.needsUpdate = true;
      trailShellMaterial.uniforms.uColor.value.set(light ? "#6d8f05" : ACID);
      trailShellMaterial.uniforms.uHotColor.value.set(light ? "#40590a" : "#f4ffd6");
      trailShellMaterial.uniforms.uGain.value = light ? 0.8 : 1.1;
      base.wire = light ? 0.72 : 0.46;
      base.dust = light ? 0.5 : 0.55;
      base.glow = light ? 0.07 : 0.16;
      base.ringA = light ? 0.5 : 0.42;
      base.ringB = light ? 0.38 : 0.3;
      base.key = light ? 60 : 95;
    };
    applyTheme(document.body.classList.contains("theme-light"));
    themeRef.current = applyTheme;

    /*
     * The canvas spans the whole hero, so framing is derived from .hero-stage: the planet parks at its
     * centre and keeps a size relative to it, while the star field fills the viewport at any breakpoint.
     * Layout offsets, not getBoundingClientRect — GSAP scales ancestors during the entrance.
     */
    const anchorElement = host.parentElement?.querySelector<HTMLElement>(".hero-stage") ?? null;
    const fovRad = (camera.fov * Math.PI) / 180;

    const resize = (width: number, height: number) => {
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;

      const stageSize = anchorElement?.offsetHeight || height * 0.55;
      camera.position.z = (OBJECT_SPAN * height) / (2 * Math.tan(fovRad / 2) * FRAME_FILL * stageSize);
      camera.updateProjectionMatrix();

      const halfHeight = Math.tan(fovRad / 2) * camera.position.z;
      const halfWidth = halfHeight * camera.aspect;
      if (anchorElement && host.parentElement) {
        const center = layoutCenter(anchorElement, host.parentElement);
        anchor.set(((center.x / width) * 2 - 1) * halfWidth, (1 - (center.y / height) * 2) * halfHeight, 0);
      } else {
        anchor.set(0, 0, 0);
      }

      const spread = camera.position.z / REFERENCE_Z;
      dust.scale.setScalar(spread);
      dustMaterial.size = DUST_SIZE * spread;
    };
    const observer = new ResizeObserver(([entry]) => resize(entry.contentRect.width, entry.contentRect.height));
    observer.observe(host);
    resize(host.clientWidth, host.clientHeight);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let hover = 0;
    let hoverTarget = 0;

    const raycaster = new Raycaster();
    const ndc = new Vector2();
    const scratch = new Vector3();
    const pointerArea = host.closest(".solutions-hero") ?? host;
    let pendingPointer: { clientX: number; clientY: number } | null = null;
    let trailHead = 0;

    const pushTrail = (point: Vector3) => {
      /* Local space, so the streak stays painted on the surface while the planet keeps spinning. */
      group.worldToLocal(scratch.copy(point)).normalize();
      const head = trailDirs[trailHead];
      if (trailAmp[trailHead] > 0 && head.dot(scratch) > TRAIL_STEP_COS) {
        trailAmp[trailHead] = 1;
        return;
      }
      trailHead = (trailHead + 1) % trailLength;
      trailDirs[trailHead].copy(scratch);
      trailAmp[trailHead] = 1;
    };

    const onPointerMove = (event: Event) => {
      const { clientX, clientY } = event as PointerEvent;
      pendingPointer = { clientX, clientY };
    };
    const onPointerLeave = () => {
      hoverTarget = 0;
      pendingPointer = null;
    };

    if (!reduced && window.matchMedia("(hover: hover)").matches) {
      pointerArea.addEventListener("pointermove", onPointerMove, { passive: true });
      pointerArea.addEventListener("pointerleave", onPointerLeave);
    }

    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    let intro = 0;
    /* The object is decorative; 30fps keeps its motion alive without competing with page scroll. */
    const frameInterval = 1000 / 30;
    let isInView = true;
    let scrollResumeTimer = 0;

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      /* Clamp both ends: the rAF timestamp can predate the performance.now() taken in start(). */
      const delta = Math.min(Math.max((now - last) / 1000, 0), 0.05);
      if (frameInterval && delta * 1000 < frameInterval) return;
      last = now;
      elapsed += delta;
      intro = Math.min(intro + delta / 1.3, 1);

      if (pendingPointer) {
        const bounds = host.getBoundingClientRect();
        targetX = ((pendingPointer.clientX - bounds.left) / bounds.width - 0.5) * 2;
        targetY = ((pendingPointer.clientY - bounds.top) / bounds.height - 0.5) * 2;

        /* The canvas is pointer-events: none, so hover is resolved by raycasting the core itself. */
        ndc.set(targetX, -targetY);
        raycaster.setFromCamera(ndc, camera);
        const hit = raycaster.intersectObject(core, false)[0];
        hoverTarget = hit ? 1 : 0;
        if (hit) pushTrail(hit.point);
        pendingPointer = null;
      }

      const ease = 1 - (1 - intro) ** 3;

      const follow = Math.min(delta * 3.4, 1);
      pointerX += (targetX - pointerX) * follow;
      pointerY += (targetY - pointerY) * follow;
      hover += (hoverTarget - hover) * Math.min(delta * 5.5, 1);

      group.rotation.y += delta * (0.17 + hover * 0.1);
      group.rotation.x = Math.sin(elapsed * 0.32) * 0.1 + pointerY * -0.26;
      group.rotation.z = pointerX * 0.09;
      group.position.x = anchor.x + pointerX * 0.22;
      group.position.y = anchor.y - pointerY * 0.16 + Math.sin(elapsed * 0.7) * 0.07;
      group.scale.setScalar((0.74 + 0.26 * ease) * (1 + Math.sin(elapsed * 1.15) * 0.018) * (1 + hover * 0.03));

      const fade = delta / TRAIL_LIFE;
      for (let i = 0; i < trailLength; i += 1) {
        if (trailAmp[i] > 0) trailAmp[i] = Math.max(trailAmp[i] - fade, 0);
      }

      rimShellMaterial.uniforms.uHover.value = hover;
      bloomShellMaterial.uniforms.uHover.value = hover;
      wireMaterial.opacity = base.wire + hover * 0.22;
      glowMaterial.opacity = base.glow * (1 + hover * 0.9);
      ringAMaterial.opacity = base.ringA * (1 + hover * 0.4);
      ringBMaterial.opacity = base.ringB * (1 + hover * 0.4);
      dustMaterial.opacity = base.dust * (1 + hover * 0.3);
      coreMaterial.emissiveIntensity = 1 + hover * 0.6;
      keyLight.intensity = base.key * (1 + hover * 0.25);

      ringA.rotation.z += delta * (0.22 + hover * 0.18);
      ringB.rotation.x -= delta * (0.16 + hover * 0.14);
      dust.rotation.y -= delta * 0.045;
      dust.rotation.x = Math.sin(elapsed * 0.2) * 0.12;

      renderer.render(scene, camera);
    };

    const start = () => {
      if (frame || reduced || !isInView || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(render);
    };
    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    if (reduced) {
      group.rotation.set(0.28, 0.62, 0);
      group.position.copy(anchor);
      group.scale.setScalar(1);
      renderer.render(scene, camera);
    } else {
      start();
    }

    const inView = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView) start();
      else stop();
    });
    inView.observe(host);
    const onScroll = () => {
      if (reduced || !isInView) return;
      stop();
      window.clearTimeout(scrollResumeTimer);
      scrollResumeTimer = window.setTimeout(() => {
        scrollResumeTimer = 0;
        start();
      }, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollResumeTimer);
      inView.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      pointerArea.removeEventListener("pointermove", onPointerMove);
      pointerArea.removeEventListener("pointerleave", onPointerLeave);
      themeRef.current = null;
      environment.dispose();
      pmrem.dispose();
      [coreGeometry, wireGeometry, glowGeometry, glowShellGeometry, ringGeometry, dustGeometry].forEach((geometry) => geometry.dispose());
      [coreMaterial, wireMaterial, glowMaterial, rimShellMaterial, trailShellMaterial, bloomShellMaterial, ringAMaterial, ringBMaterial, dustMaterial].forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    themeRef.current?.(theme === "light");
  }, [theme]);

  return <div className="hero-object__stage" ref={hostRef} aria-hidden="true" />;
}
