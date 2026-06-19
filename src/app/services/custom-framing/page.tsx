"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./customframing.css";

import FramePreview from "@/components/FramePreview/FramePreview";
import Footer from "@/components/ui/Footer";

gsap.registerPlugin(SplitText, ScrollTrigger);

const CAROUSEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75",
    alt: "Framed football jersey",
  },
  {
    src: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&q=75",
    alt: "Framed landscape painting",
  },
  {
    src: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=75",
    alt: "Framed certificate",
  },
  {
    src: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=600&q=75",
    alt: "Ornate framed portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=75",
    alt: "Modern minimalist frame",
  },
];


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleBgRef = useRef<HTMLDivElement>(null);
  const focalFrameRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. SplitText animation for background heading
    const h1Bg = titleBgRef.current;
    let split: SplitText | null = null;
    if (h1Bg) {
      split = new SplitText(h1Bg, { type: "chars", charsClass: "char++" });
      split.chars.forEach((char) => {
        const wrapper = document.createElement("span");
        wrapper.className = "char-mask";
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        char.parentNode?.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });
      gsap.set(split.chars, { y: "100%" });
      gsap.to(split.chars, {
        y: "0%",
        duration: 1.2,
        stagger: 0.1,
        delay: 0.2,
        ease: "power4.out",
      });
    }

    // 2. Focal Frame Clip Path and Slide Up Reveal
    if (focalFrameRef.current) {
      gsap.set(focalFrameRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        y: 120,
        opacity: 0,
        scale: 0.95
      });
      gsap.to(focalFrameRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.6,
        delay: 0.6,
        ease: "power4.out"
      });
    }

    // 3. Scroll Parallax and Catalogue reveals
    const ctx = gsap.context(() => {
      // Background title parallax
      gsap.to(titleBgRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Focal frame parallax
      gsap.to(focalFrameRef.current, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Stagger reveal exhibition grid items on scroll
      const gridItems = gridRef.current?.querySelectorAll(".cf-exhibit-card");
      if (gridItems && gridItems.length > 0) {
        gsap.fromTo(
          gridItems,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Editorial intro fade-in
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%"
            }
          }
        );
      }
    }, heroRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = focalFrameRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    gsap.to(card, {
      rotateY: normX * 8,
      rotateX: -normY * 8,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    const card = focalFrameRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      ease: "power2.out",
      duration: 0.8
    });
  };

  return (
    <section className="cf-hero-museum" ref={heroRef}>
      {/* 1. Header Section with Focal Frame and Title */}
      <div className="cf-hero-header-wrap">
        <h1 className="cf-hero-museum-title" ref={titleBgRef}>
          FRAMED
        </h1>

        <div 
          className="cf-hero-focal-frame-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cf-hero-focal-frame" ref={focalFrameRef}>
            <div className="cf-frame-moulding-custom frame-walnut">
              <div className="cf-frame-mat-custom">
                <img 
                  src="/services/framing-hero-2.jpg" 
                  alt="Masterpiece Custom Shadow Box" 
                  className="cf-frame-img-custom"
                />
              </div>
            </div>
            
            <div className="cf-museum-tag">
              <span className="cf-tag-exhibit">EXHIBIT NO. 3052</span>
              <span className="cf-tag-title">Custom Shadow Box</span>
              <span className="cf-tag-spec">Moulding: Roasted Walnut &bull; Mat: Warm Cotton</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Editorial Description Strip */}
      <div className="cf-hero-intro" ref={introRef}>
        <div className="cf-intro-label">
          <span>(01 / Philosophy)</span>
        </div>
        <div className="cf-intro-content">
          <h2>
            Some pieces deserve more than storage—they demand to be seen. 
            We handcraft museum-grade frames designed with perfect proportion, 
            authentic materials, and archival preservation to capture your story forever.
          </h2>
          <div className="cf-intro-actions">
            <a href="#preview" className="cf-btn-luxury">
              Interactive Studio
            </a>
            <a href="/contact" className="cf-btn-luxury-outline">
              Contact Workshop
            </a>
          </div>
        </div>
      </div>

      {/* 3. Three-Column Exhibition Catalogue Grid */}
      <div className="cf-exhibition-grid-container">
        <div className="cf-exhibition-grid-header">
          <span>(02 / Selection)</span>
          <h3>Exhibition Catalogue</h3>
        </div>
        
        <div className="cf-exhibition-grid" ref={gridRef}>
          {/* Card 1: Vibrant Market Painting */}
          <div className="cf-exhibit-card">
            <div className="cf-exhibit-frame-wrap frame-gold-gilt">
              <div className="cf-exhibit-mat-wrap">
                <img 
                  src="/services/framing-hero-4.jpg" 
                  alt="Framed Market Scene Painting" 
                />
              </div>
            </div>
            <div className="cf-exhibit-label-card">
              <h4>Fine Art Framing</h4>
              <p>Ornate Gold moulding with archival acid-free matting for canvas paintings.</p>
              <span className="cf-exhibit-specs">EXHIBIT NO. 3074 &bull; Gold Gilt Frame</span>
            </div>
          </div>

          {/* Card 2: Bronze Sculptures */}
          <div className="cf-exhibit-card">
            <div className="cf-exhibit-frame-wrap frame-natural-oak">
              <div className="cf-exhibit-mat-wrap">
                <img 
                  src="/services/framing-hero-1.jpg" 
                  alt="African Bronze Sculptures display" 
                />
              </div>
            </div>
            <div className="cf-exhibit-label-card">
              <h4>Three-Dimensional Objects</h4>
              <p>Natural oak shadowbox showcases displaying artifacts with structural depth.</p>
              <span className="cf-exhibit-specs">EXHIBIT NO. 3046 &bull; Natural Oak Frame</span>
            </div>
          </div>

          {/* Card 3: Gallery Wall */}
          <div className="cf-exhibit-card">
            <div className="cf-exhibit-frame-wrap frame-white-oak">
              <div className="cf-exhibit-mat-wrap">
                <img 
                  src="/services/framing-hero-3.jpg" 
                  alt="Custom Living Room Gallery Wall" 
                />
              </div>
            </div>
            <div className="cf-exhibit-label-card">
              <h4>Gallery Wall Collections</h4>
              <p>Chalky white oak frame sets curated to hang together in modern interiors.</p>
              <span className="cf-exhibit-specs">EXHIBIT NO. 3016 &bull; White Walnut Frame</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureProps {
  flip?: boolean;
  label: string;
  title: string;
  body: string;
  list?: string[];
  actions: {
    label: string;
    outline?: boolean;
  }[];
  imgSrc: string;
  imgAlt: string;
}

const Feature = ({
  flip,
  label,
  title,
  body,
  list,
  actions,
  imgSrc,
  imgAlt,
}: FeatureProps) => (
  <section className={`feature ${flip ? "flip" : ""}`}>
    <div
      className={`feature__img ${
        flip ? "reveal-right" : "reveal-left"
      }`}
    >
      <img src={imgSrc} alt={imgAlt} />
    </div>

    <div
      className={`feature__copy ${
        flip ? "reveal-left" : "reveal-right"
      }`}
    >
      <span className="cf-sec-label">{label}</span>

      <h2>{title}</h2>

      <p>{body}</p>

      {list && (
        <ul className="cf-feature__list">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <div className="cf-feature__actions">
        {actions.map((action) => (
          <a
            key={action.label}
            href="#"
            className={`btn btn-sm ${
              action.outline ? "btn-outline" : "btn-red"
            }`}
          >
            {action.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);

const WorkCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;

    const animation = gsap.to(track, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    const pause = () => animation.pause();
    const play = () => animation.resume();

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);

    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
      animation.kill();
    };
  }, []);

  return (
    <section className="cf-luxury-gallery">
      <div className="cf-gallery-header reveal">
        <span>Selected Works</span>
        <h2>Crafted For Generations</h2>
      </div>

      <div className="cf-marquee-container">
        <div ref={trackRef} className="cf-marquee-track">
          {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map(
            (img, i) => (
              <div
                key={i}
                className="cf-marquee-item"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => (
  <section className="cf-testimonial">
    <blockquote className="reveal">
      "CraftHive transformed my family photos into stunning
      pieces of art. Their attention to detail exceeded my
      expectations."
    </blockquote>

    <div className="cf-testimonial__author reveal">
      <strong>Ama Boateng</strong>
      <span>Artist, Freelance</span>
    </div>
  </section>
);

const Process = () => (
  <section className="cf-process">
    <div className="cf-process__img reveal-left">
      <img
        src="https://images.unsplash.com/photo-1607532941433-304659e8198a?w=900&q=80"
        alt="Framing process"
      />
    </div>

    <div className="cf-process__steps reveal-right">
      <h2>Our Framing Process</h2>

      <div className="cf-step">
        <h3>Initial Consultation</h3>
        <p>
          We discuss your artwork and recommend the best
          framing solution.
        </p>
      </div>

      <div className="cf-step">
        <h3>Design Selection</h3>
        <p>
          Choose moulding, matting and finishes that suit your
          piece.
        </p>
      </div>

      <div className="cf-step">
        <h3>Craftsmanship</h3>
        <p>
          Every frame is handcrafted with precision and care.
        </p>
      </div>
    </div>
  </section>
);

const CTABanner = () => (
  <section className="cf-cta-banner">
    <h2 className="reveal">
      Ready to frame your memories?
    </h2>

    <p className="reveal">
      Let our team transform your artwork into something
      timeless.
    </p>

    <div className="cf-cta-banner-btns reveal">
      <a href="#" className="cf-btn cf-btn-red">
        Consult
      </a>

      <a href="/contact" className="cf-btn cf-btn-outline">
        Contact
      </a>
    </div>
  </section>
);

export default function CustomFramingPage() {
  useEffect(() => {
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
    <>
      <Hero />

      <Feature
        label="Craft"
        title="Frame every memory with precision and care"
        body="We specialise in transforming treasured items into beautifully preserved masterpieces."
        list={[
          "Pictures and Paintings",
          "Documents and Certificates",
          "Jerseys and Memorabilia",
        ]}
        actions={[
          { label: "Consult", outline: true },
          { label: "View", outline: true },
        ]}
        imgSrc="/services/custom-framing-hero.jpg"
        imgAlt="Artisanal shelf displaying pottery and framed textile"
      />

      <Feature
        flip
        label="Quality"
        title="Crafting frames that stand the test of time"
        body="We use premium materials and expert craftsmanship."
        actions={[
          { label: "Details", outline: true },
          { label: "Materials", outline: true },
        ]}
        imgSrc="https://images.unsplash.com/photo-1560343787-e9432cc50c2d?w=900&q=80"
        imgAlt="Frame materials"
      />

      <WorkCarousel />

      <Testimonial />

      <Process />

      <section id="preview" className="preview-tool">
        <FramePreview />
      </section>

      <CTABanner />

      <Footer />
    </>
  );
}