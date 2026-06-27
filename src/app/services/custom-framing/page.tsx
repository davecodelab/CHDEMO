"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CategorySelector } from "./CategorySelector";

import "./customframing.css";

import FramePreview from "@/components/FramePreview/FramePreview";
import Footer from "@/components/ui/Footer";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Carousel images removed as requested
const HeroImageBg = () => (
  <section className="cf-hero-image-bg">
    <div className="cf-hero-overlay"></div>
    <div className="cf-hero-content reveal">
      <h1>True Custom Framing</h1>
      <p>Handcrafted for every piece, made with premium materials.<br/><br/>Custom framing made easy.</p>
      <a 
        href="#preview" 
        className="cf-hero-btn"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        START FRAMING
      </a>
    </div>
  </section>
);

const MadeForPieces = () => (
  <section className="cf-text-section">
    <div className="cf-text-container reveal">
      <h2>Made For The Pieces That Matter</h2>
      <p>
        Great framing shouldn't mean expensive trips or complicated setups. We've made custom framing effortless, with everything you need delivered straight to your door.
      </p>
      <p>
        Each frame is handcrafted to fit your artwork perfectly and includes all the hardware and easy-to-follow instructions for assembly. In just a few minutes, your artwork is ready to take center stage.
      </p>
    </div>
  </section>
);

const ImageGrid = () => (
  <section className="cf-image-grid-section">
    <div className="cf-image-grid">
      <div className="cf-grid-img reveal-left">
        <img src="/services/cf-image-3.png" alt="Custom framing setup" />
      </div>
      <div className="cf-grid-img reveal">
        <img src="/services/cf-image-1.png" alt="Custom framing artwork detail" />
      </div>
      <div className="cf-grid-img reveal-right">
        <img src="/services/cf-image-2.png" alt="Custom framing wall setup" />
      </div>
    </div>
  </section>
);

const FramingOriginText = () => (
  <section className="cf-text-section-bottom">
    <div className="cf-text-container reveal">
      <p>
        Handcrafted in Kumasi, Ghana with conservation-grade materials and careful attention to detail. Museum-quality framing, made closer and more accessible.
      </p>
      <p>
        Watch the video below to see how effortless it is to frame your artwork at home.
      </p>
    </div>
  </section>
);

const Feature1 = () => (
  <section className="cf-feature">
    <div className="cf-feature-img reveal-left">
      <img
        src="/services/framing-hero-1.jpg"
        alt="Mitred frame joints with spline detail"
      />
    </div>
    <div className="cf-feature-copy reveal-right">
      <span className="cf-sec-label">The Joinery</span>
      <h2>Honest hardwoods, joined to endure</h2>
      <p>
        We construct our frames using solid hardwoods. Each corner is reinforced with maple splines—a traditional woodworking technique that locks the miter joint forever and prevents warping.
      </p>
      <div className="cf-feature-actions">
        <a href="/contact" className="cf-btn cf-btn-red">
          Request Timber Samples
        </a>
      </div>
    </div>
  </section>
);

const MaterialsOfPreservation = () => (
  <section className="cf-materials-section">
    <div className="cf-materials-head container reveal">
      <span className="cf-sec-label">Materials</span>
      <h2>Made for conservation, finished by hand</h2>
      <p>
        Every layer of our custom frames is acid-free and museum-grade, preserving the original beauty of your artwork for generations.
      </p>
    </div>
    <div className="cf-materials-grid container">
      {[
        {
          n: "01",
          title: "Timber Mouldings",
          desc: "Solid hardwoods—Roasted Walnut, Chalky White Oak, and Honey Oak—sourced sustainably and hand-finished with organic wax."
        },
        {
          n: "02",
          title: "Conservation Matting",
          desc: "Acid-free, alkaline-buffered cotton matboards that prevent acid burns and discoloration over time."
        },
        {
          n: "03",
          title: "Museum Glazing",
          desc: "Virtually invisible glazing with 99% UV protection to block harmful light rays and eliminate glare."
        },
        {
          n: "04",
          title: "Archival Mounting",
          desc: "Reversible mounting using acid-free Japanese hinging tissue, ensuring your prints remain undamaged."
        }
      ].map((m) => (
        <div className="cf-mat-card reveal" key={m.n}>
          <span className="cf-mat-card-num">{m.n}</span>
          <h3>{m.title}</h3>
          <p>{m.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Feature2 = () => (
  <section className="cf-feature cf-feature-flip">
    <div className="cf-feature-img reveal-right">
      <img
        src="/services/framing-hero-3.jpg"
        alt="Archival mounting of canvas print"
      />
    </div>
    <div className="cf-feature-copy reveal-left">
      <span className="cf-sec-label">Conservation</span>
      <h2>Protecting your history from light and time</h2>
      <p>
        Every framing layer is acid-free. We use cotton matboards and 99% UV-filtering museum glass to ensure your photographs, relics, and canvases never fade or discolor.
      </p>
      <div className="cf-feature-actions">
        <a href="/contact" className="cf-btn cf-btn-red">
          Consult on Preservation
        </a>
      </div>
    </div>
  </section>
);


const Testimonial = () => (
  <section className="cf-testimonial-accent">
    <div className="cf-testimonial-box reveal">
      <div className="bracket bracket--tl" />
      <div className="bracket bracket--br" />
      <span className="cf-testimonial-quote-icon">“</span>
      <blockquote>
        \"CraftHive transformed my family photos into stunning pieces of art. The solid walnut frame and archival matting exceeded my expectations in every way.\"
      </blockquote>
      <div className="cf-testimonial-author">
        <strong>Ama Boateng</strong>
        <span>Artist & Curator</span>
      </div>
    </div>
  </section>
);

const CTABanner = () => (
  <section className="cf-cta-immersive">
    <div className="cf-cta-content reveal">
      <span className="cf-cta-tag">CRAFT HIVE</span>
      <h2>
        Ready to frame
        <br />
        your memories?
      </h2>
      <p>
        Whether it is a family photograph, a gallery-grade canvas, or a cherished heirloom—consult with our workshop to build something that lasts.
      </p>
      <div className="cf-cta-actions">
        <a href="/contact" className="cf-cta-btn">
          Consult Workshop
        </a>
        <a href="#preview" className="cf-cta-btn-outline">
          Try Preview Tool
        </a>
      </div>
    </div>
    <div className="cf-cta-glow" />
  </section>
);

export default function CustomFramingPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    gsap.utils.toArray(".reveal").forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    gsap.utils.toArray(".reveal-left").forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    gsap.utils.toArray(".reveal-right").forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="custom-framing-wrapper" ref={pageRef}>
      <HeroImageBg />
      <MadeForPieces />
      <ImageGrid />
      <FramingOriginText />
      <CategorySelector />

      <Testimonial />

      <section id="preview" className="preview-tool">
        <FramePreview />
      </section>

      <CTABanner />

      <Footer />
    </div>
  );
}
