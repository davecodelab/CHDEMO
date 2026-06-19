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
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Text SplitText animation
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
        duration: 1.1,
        stagger: 0.12,
        delay: 0.4,
        ease: "power4.out",
      });
    }

    // 2. Image clip-path reveals
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
    cards.forEach((card, i) => {
      if (!card) return;
      // Start hidden with a clipping path and offset
      gsap.set(card, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        y: 80,
        opacity: 0
      });
      // Staggered slide up & clip-path reveal
      gsap.to(card, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 0.5 + i * 0.2,
        ease: "power4.out"
      });
    });

    // 3. Scroll Parallax effects
    const ctx = gsap.context(() => {
      // Parallax on background title
      gsap.to(titleBgRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Parallax on image cards (staggered directions & speeds)
      if (card1Ref.current) {
        gsap.to(card1Ref.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
      if (card2Ref.current) {
        gsap.to(card2Ref.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
      if (card3Ref.current) {
        gsap.to(card3Ref.current, {
          y: -160,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
      if (card4Ref.current) {
        gsap.to(card4Ref.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, heroRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    gsap.to(card, {
      rotateY: normX * 10,
      rotateX: -normY * 10,
      transformPerspective: 1000,
      scale: 1.025,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    const card = ref.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      ease: "power2.out",
      duration: 0.6
    });
  };

  return (
    <section className="cf-hero" ref={heroRef}>
      <h1 className="cf-hero-title-bg-massive" ref={titleBgRef}>
        FRAMED
      </h1>

      <div className="cf-hero-grid">
        <div className="cf-hero-left-editorial">
          <span className="cf-hero-eyebrow-luxury">Bespoke Framing</span>
          <h2 className="cf-hero-heading-editorial">
            Heritage <br />
            <span className="cf-italic">Preserved</span>
          </h2>
          <p className="cf-hero-description-editorial">
            From treasured family heirlooms and fine art prints to traditional textiles and custom shadow boxes. Our master artisans handcraft every frame with conservation-grade materials.
          </p>
          <div className="cf-hero-btns-editorial">
            <a href="#preview" className="cf-btn-editorial-red">
              Interactive Studio
            </a>
            <a href="/contact" className="cf-btn-editorial-outline">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="cf-hero-collage-container">
          {/* Card 1: Museum Shadow Box */}
          <div 
            className="cf-collage-card card-shadowbox" 
            ref={card1Ref}
            onMouseMove={(e) => handleMouseMove(e, card1Ref)}
            onMouseLeave={() => handleMouseLeave(card1Ref)}
          >
            <div className="cf-frame-moulding-custom frame-walnut">
              <div className="cf-frame-mat-custom">
                <img 
                  src="/services/framing-hero-2.jpg" 
                  alt="Museum Shadow Box Framing" 
                  className="cf-frame-img-custom"
                />
              </div>
            </div>
            <div className="cf-card-label">
              <span className="label-num">EXHIBIT NO. 3052</span>
              <span className="label-desc">Museum Shadow Box &bull; Roasted Walnut</span>
            </div>
          </div>

          {/* Card 2: Gallery Wall */}
          <div 
            className="cf-collage-card card-gallerywall" 
            ref={card2Ref}
            onMouseMove={(e) => handleMouseMove(e, card2Ref)}
            onMouseLeave={() => handleMouseLeave(card2Ref)}
          >
            <div className="cf-frame-moulding-custom frame-white-oak">
              <div className="cf-frame-mat-custom">
                <img 
                  src="/services/framing-hero-3.jpg" 
                  alt="Custom Living Room Gallery Wall" 
                  className="cf-frame-img-custom"
                />
              </div>
            </div>
            <div className="cf-card-label">
              <span className="label-num">EXHIBIT NO. 3016</span>
              <span className="label-desc">Home Gallery &bull; White Walnut Collection</span>
            </div>
          </div>

          {/* Card 3: Market Painting */}
          <div 
            className="cf-collage-card card-painting" 
            ref={card3Ref}
            onMouseMove={(e) => handleMouseMove(e, card3Ref)}
            onMouseLeave={() => handleMouseLeave(card3Ref)}
          >
            <div className="cf-frame-moulding-custom frame-gold-gilt">
              <div className="cf-frame-mat-custom">
                <img 
                  src="/services/framing-hero-4.jpg" 
                  alt="Framed Market Scene Painting" 
                  className="cf-frame-img-custom"
                />
              </div>
            </div>
            <div className="cf-card-label">
              <span className="label-num">EXHIBIT NO. 3074</span>
              <span className="label-desc">Ornate Gold &bull; Linen Mat</span>
            </div>
          </div>

          {/* Card 4: Sculptures */}
          <div 
            className="cf-collage-card card-sculptures" 
            ref={card4Ref}
            onMouseMove={(e) => handleMouseMove(e, card4Ref)}
            onMouseLeave={() => handleMouseLeave(card4Ref)}
          >
            <div className="cf-frame-moulding-custom frame-natural-oak">
              <div className="cf-frame-mat-custom">
                <img 
                  src="/services/framing-hero-1.jpg" 
                  alt="African Bronze Sculptures display" 
                  className="cf-frame-img-custom"
                />
              </div>
            </div>
            <div className="cf-card-label">
              <span className="label-num">EXHIBIT NO. 3046</span>
              <span className="label-desc">Gallery Pedestal Setup &bull; Natural Oak</span>
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