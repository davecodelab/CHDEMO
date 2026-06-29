"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Collection.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Piece {
  id: string;
  src: string;
  alt: string;
  plate: string;
  // Freeform spatial layout — no grid
  top: string;
  left: string;
  width: number;   // px
  height: number;  // px
  depth: number;   // 1 (far/small) → 5 (near/hero)
  initialRotate: number; // degrees
  tiltStrength: number;  // cursor parallax multiplier
  blendMode?: string;
}

const PIECES: Piece[] = [
  {
    id: "p01",
    src: "/gallery/archive-02.jpg",
    alt: "Woven linen study",
    plate: "I — Woven Light",
    top: "8svh",
    left: "10vw",
    width: 520,
    height: 680,
    depth: 5,
    initialRotate: -2,
    tiltStrength: 0.018,
  },
  {
    id: "p02",
    src: "/gallery/archive-05.jpg",
    alt: "Clay vessel detail",
    plate: "II — Vessel",
    top: "6svh",
    left: "62vw",
    width: 260,
    height: 340,
    depth: 2,
    initialRotate: 3,
    tiltStrength: 0.007,
  },
  {
    id: "p03",
    src: "/gallery/archive-01.jpg",
    alt: "Indigo dye texture",
    plate: "III — Indigo Field",
    top: "55svh",
    left: "38vw",
    width: 420,
    height: 560,
    depth: 4,
    initialRotate: 1.5,
    tiltStrength: 0.014,
  },
  {
    id: "p04",
    src: "/gallery/archive-17.jpg",
    alt: "Ceramic shard collection",
    plate: "IV — Fragments",
    top: "72vh",
    left: "72vw",
    width: 200,
    height: 240,
    depth: 1,
    initialRotate: -4,
    tiltStrength: 0.004,
  },
  {
    id: "p05",
    src: "/gallery/archive-21.jpg",
    alt: "Hammered copper surface",
    plate: "V — Copper Memory",
    top: "110svh",
    left: "5vw",
    width: 360,
    height: 460,
    depth: 3,
    initialRotate: 2,
    tiltStrength: 0.011,
  },
  {
    id: "p06",
    src: "/gallery/archive-06.jpg",
    alt: "Paper pulp sculpture",
    plate: "VI — Pulp Study",
    top: "105vh",
    left: "55vw",
    width: 560,
    height: 720,
    depth: 5,
    initialRotate: -1,
    tiltStrength: 0.019,
  },
  {
    id: "p07",
    src: "/gallery/archive-20.jpg",
    alt: "Bark and resin texture",
    plate: "VII — Bark",
    top: "168vh",
    left: "25vw",
    width: 280,
    height: 380,
    depth: 2,
    initialRotate: 4,
    tiltStrength: 0.008,
  },
  {
    id: "p08",
    src: "/gallery/archive-08.jpg",
    alt: "Large raw linen piece",
    plate: "VIII — Raw Ground",
    top: "175vh",
    left: "60vw",
    width: 480,
    height: 600,
    depth: 4,
    initialRotate: -2.5,
    tiltStrength: 0.015,
  },
  {
    id: "p09",
    src: "/gallery/archive-10.jpg",
    alt: "Rust pigment detail",
    plate: "IX — Rust",
    top: "240vh",
    left: "8vw",
    width: 600,
    height: 780,
    depth: 5,
    initialRotate: 1,
    tiltStrength: 0.02,
  },
  {
    id: "p10",
    src: "/gallery/archive-15.jpg",
    alt: "Silk thread web",
    plate: "X — Thread",
    top: "245vh",
    left: "62vw",
    width: 240,
    height: 300,
    depth: 1,
    initialRotate: -5,
    tiltStrength: 0.005,
  },
  {
    id: "p11",
    src: "/gallery/archive-12.jpg",
    alt: "Burnished gold leaf",
    plate: "XI — Aureate",
    top: "305vh",
    left: "35vw",
    width: 440,
    height: 580,
    depth: 4,
    initialRotate: 3,
    tiltStrength: 0.013,
  },
  {
    id: "p12",
    src: "/gallery/archive-09.jpg",
    alt: "Final piece — full studio",
    plate: "XII — The Studio",
    top: "370vh",
    left: "15vw",
    width: 640,
    height: 820,
    depth: 5,
    initialRotate: -1.5,
    tiltStrength: 0.017,
  },
];

// ─── Depth to visual properties ──────────────────────────────────────────────

const depthOpacity = (d: number) => 0.55 + d * 0.09; // 0.64 → 1.0
const depthBlur    = (d: number) => Math.max(0, (3 - d) * 0.4); // near = sharp

// ─── Component ────────────────────────────────────────────────────────────────

export default function CraftHiveGallery() {
  const stageRef   = useRef<HTMLDivElement>(null);
  const sceneRef   = useRef<HTMLDivElement>(null);
  const frameRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef  = useRef<HTMLDivElement>(null);
  const footerRef  = useRef<HTMLDivElement>(null);

  // quickSetters — created once, zero allocation per frame
  const qsMap = useRef<Map<number, {
    rotX: ReturnType<typeof gsap.quickSetter>;
    rotY: ReturnType<typeof gsap.quickSetter>;
    imgX: ReturnType<typeof gsap.quickSetter>;
    imgY: ReturnType<typeof gsap.quickSetter>;
  }>>(new Map());

  const mouse = useRef({ x: 0, y: 0, lx: 0, ly: 0 });
  const rafId = useRef<number>(0);
  const isReduced = useRef(false);

  // ── Setup quickSetters per frame ──────────────────────────────────────────

  const buildQuickSetters = useCallback(() => {
    frameRefs.current.forEach((frame, i) => {
      if (!frame) return;
      const img = frame.querySelector<HTMLElement>(".ch-img-wrap");
      if (!img) return;
      qsMap.current.set(i, {
        rotX: gsap.quickSetter(frame, "rotationX", "deg"),
        rotY: gsap.quickSetter(frame, "rotationY", "deg"),
        imgX: gsap.quickSetter(img,   "x", "px"),
        imgY: gsap.quickSetter(img,   "y", "px"),
      });
    });
  }, []);

  // ── Cursor tilt RAF loop ──────────────────────────────────────────────────

  const startTiltLoop = useCallback(() => {
    const loop = () => {
      const m = mouse.current;
      // Smooth lerp toward real mouse position
      m.lx += (m.x - m.lx) * 0.06;
      m.ly += (m.y - m.ly) * 0.06;

      const nx = (m.lx / window.innerWidth  - 0.5) * 2; // -1 → 1
      const ny = (m.ly / window.innerHeight - 0.5) * 2;

      if (!isReduced.current) {
        PIECES.forEach((piece, i) => {
          const qs = qsMap.current.get(i);
          if (!qs) return;
          const s = piece.tiltStrength * 80;
          qs.rotX(-ny * s);
          qs.rotY( nx * s);
          // Inner image floats opposite direction — parallax depth illusion
          qs.imgX(nx * piece.tiltStrength * 12);
          qs.imgY(ny * piece.tiltStrength * 12);
        });
      }

      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
  }, []);

  // ── ScrollTrigger animations ──────────────────────────────────────────────

  const buildScrollAnimations = useCallback(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ── Hero entrance: header chars reveal
      if (headerRef.current) {
        const words = headerRef.current.querySelectorAll(".ch-word");
        gsap.from(words, {
          yPercent: 110,
          opacity: 0,
          rotationZ: 4,
          duration: 1.2,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      // ── Each artwork: scroll-driven entrance from below + depth scale
      frameRefs.current.forEach((frame, i) => {
        if (!frame) return;
        const piece  = PIECES[i];
        const label  = labelRefs.current[i];
        const scaleFrom = 0.88 + piece.depth * 0.012;

        // Frame rises and snaps into place
        gsap.from(frame, {
          scrollTrigger: {
            trigger: frame,
            start: "top 95%",
            end:   "top 30%",
            scrub: 1.4,
          },
          y: 120 + (5 - piece.depth) * 30,
          opacity: 0,
          scale: scaleFrom,
          rotationZ: piece.initialRotate * 1.8,
          ease: "power2.out",
        });

        // Label fades in slightly after frame
        if (label) {
          gsap.from(label, {
            scrollTrigger: {
              trigger: frame,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 0,
            y: 10,
            duration: 0.7,
            ease: "power3.out",
          });
        }

        // Slow parallax while in view — deeper pieces move slower
        const yAmt = -40 - piece.depth * 20;
        gsap.to(frame, {
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end:   "bottom top",
            scrub: true,
          },
          y: yAmt,
          ease: "none",
        });
      });

     
      return () => {};
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      isReduced.current = true;
      // Still fade in, just no movement
      frameRefs.current.forEach((frame) => {
        if (!frame) return;
        gsap.from(frame, {
          scrollTrigger: { trigger: frame, start: "top 90%", toggleActions: "play none none none" },
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });
      return () => {};
    });

    return () => mm.revert();
  }, []);

  // ── Hover: frame spotlight ────────────────────────────────────────────────

  const onFrameEnter = useCallback((i: number) => {
    const frame = frameRefs.current[i];
    if (!frame || isReduced.current) return;
    gsap.to(frame.querySelector(".ch-frame-border"), {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(frame.querySelector(".ch-img-inner"), {
      scale: 1.04,
      duration: 0.7,
      ease: "power2.out",
    });
  }, []);

  const onFrameLeave = useCallback((i: number) => {
    const frame = frameRefs.current[i];
    if (!frame) return;
    gsap.to(frame.querySelector(".ch-frame-border"), {
      opacity: 0.3,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(frame.querySelector(".ch-img-inner"), {
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
    });
  }, []);

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    buildQuickSetters();
    startTiltLoop();
    const cleanup = buildScrollAnimations();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
      cleanup?.();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [buildQuickSetters, startTiltLoop, buildScrollAnimations]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="ch-stage" ref={stageRef}>
      {/* ── Ambient gradient bg ───────────────────────────── */}
      <div className="ch-ambient" aria-hidden="true">
        <div className="ch-ambient-orb ch-orb-1" />
        <div className="ch-ambient-orb ch-orb-2" />
        <div className="ch-ambient-orb ch-orb-3" />
      </div>

      {/* ── Noise grain overlay ───────────────────────────── */}
      <div className="ch-grain" aria-hidden="true" />

      {/* ── Exhibition scene ──────────────────────────────── */}
      <div className="ch-scene" ref={sceneRef} id="gallery" >
        {PIECES.map((piece, i) => (
          <article
            key={piece.id}
            className={`ch-piece ch-depth-${piece.depth}`}
            style={{
              top:  piece.top,
              left: piece.left,
              width:  piece.width,
              zIndex: piece.depth * 10,
            }}
          >
            <div
              className="ch-frame"
              ref={(el) => { frameRefs.current[i] = el; }}
              style={{
                "--rotate": `${piece.initialRotate}deg`,
                "--blur":   `${depthBlur(piece.depth)}px`,
              } as React.CSSProperties}
              onMouseEnter={() => onFrameEnter(i)}
              onMouseLeave={() => onFrameLeave(i)}
            >
              {/* Decorative frame border with mitre marks */}
              <div className="ch-frame-border" aria-hidden="true">
                <span className="ch-mitre ch-mitre-tl" />
                <span className="ch-mitre ch-mitre-tr" />
                <span className="ch-mitre ch-mitre-bl" />
                <span className="ch-mitre ch-mitre-br" />
              </div>

              {/* Image container — parallax inner layer */}
              <div
                className="ch-img-wrap"
                style={{ opacity: depthOpacity(piece.depth) }}
              >
                <div className="ch-img-inner">
                  <Image
                    src={piece.src}
                    alt={piece.alt}
                    width={piece.width}
                    height={piece.height}
                    loading={i < 2 ? "eager" : "lazy"}
                    quality={i < 2 ? 90 : 75}
                    className="ch-img"
                    sizes={`(max-width: 768px) 90vw, ${piece.width}px`}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
