"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HandicraftsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from(".hero-title", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".hero-copy", {
        y: 50,
        opacity: 0,
        delay: 0.3,
        duration: 1,
      });

      // Section reveals
      gsap.utils.toArray(".reveal").forEach((el: any) => {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      // Parallax images
      gsap.utils.toArray(".parallax").forEach((el: any) => {
        gsap.to(el, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Background text movement
      gsap.to(".bg-word", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".page",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Horizontal gallery
      gsap.to(".gallery-track", {
        xPercent: -60,
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery-section",
          start: "top top",
          end: "+=2500",
          pin: true,
          scrub: 1,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="page">
      <section className="hero">
        <span className="eyebrow">HANDCRAFTED COLLECTION</span>

        <h1 className="hero-title">
          Handcrafted
          <br />
          With Heritage
        </h1>

        <p className="hero-copy">
          Discover furniture, décor and artisan pieces inspired
          by African craftsmanship and modern luxury.
        </p>

        <div className="bg-word">HANDCRAFTED</div>
      </section>

      <section className="story reveal">
        <div className="story-copy">
          <span>Artisan</span>

          <h2>
            Rustic coffee tables
            that tell a story
          </h2>

          <p>
            Crafted from natural materials with unique
            character and exceptional durability.
          </p>
        </div>

        <div className="story-image parallax">
          <Image
            src="/handicrafts/table.jpg"
            alt=""
            fill
          />
        </div>
      </section>

      <section className="features reveal">
        <div className="feature">
          <h3>Natural Materials</h3>
          <p>Authentic handcrafted pieces.</p>
        </div>

        <div className="feature">
          <h3>Heritage Design</h3>
          <p>Inspired by African artistry.</p>
        </div>

        <div className="feature">
          <h3>Premium Quality</h3>
          <p>Built to last generations.</p>
        </div>

        <div className="feature">
          <h3>Custom Creations</h3>
          <p>Unique one-of-a-kind pieces.</p>
        </div>
      </section>

      <section className="showcase reveal">
        <div className="showcase-image parallax">
          <Image
            src="/handicrafts/baskets.jpg"
            alt=""
            fill
          />
        </div>

        <div className="showcase-copy">
          <h2>
            Decorative baskets
            woven by hand
          </h2>

          <p>
            Every piece is unique and celebrates
            traditional craftsmanship.
          </p>
        </div>
      </section>

      <section className="gallery-section">
        <div className="gallery-track">
          {[
            "/gallery/1.jpg",
            "/gallery/2.jpg",
            "/gallery/3.jpg",
            "/gallery/4.jpg",
            "/gallery/5.jpg",
          ].map((src, i) => (
            <div className="gallery-item" key={i}>
              <Image src={src} alt="" fill />
            </div>
          ))}
        </div>
      </section>

      <section className="cta reveal">
        <h2>
          Bring handcrafted
          luxury into your home
        </h2>

        <a href="/contact">
          Explore Collection
        </a>
      </section>

      <style jsx>{`
        .page {
          background: #fff;
          color: #111;
          overflow: hidden;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          position: relative;
        }

        .hero-title {
          font-size: clamp(4rem, 10vw, 10rem);
          line-height: 0.9;
        }

        .hero-copy {
          max-width: 700px;
          margin-top: 2rem;
        }

        .bg-word {
          position: absolute;
          font-size: 16vw;
          font-weight: 900;
          color: rgba(204, 0, 0, 0.04);
          white-space: nowrap;
          z-index: -1;
        }

        .story,
        .showcase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
          padding: 8rem 8%;
        }

        .story-image,
        .showcase-image {
          position: relative;
          height: 700px;
          overflow: hidden;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          padding: 8rem 8%;
        }

        .feature {
          padding: 3rem;
          border: 1px solid rgba(0,0,0,.08);
        }

        .gallery-section {
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .gallery-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          padding: 0 8%;
          height: 100%;
          align-items: center;
        }

        .gallery-item {
          width: 600px;
          height: 800px;
          position: relative;
          flex-shrink: 0;
        }

        .cta {
          text-align: center;
          padding: 10rem 2rem;
        }

        .cta a {
          display: inline-block;
          margin-top: 2rem;
          background: #cc0000;
          color: white;
          padding: 1rem 2rem;
          text-decoration: none;
        }

        @media (max-width: 1024px) {
          .story,
          .showcase {
            grid-template-columns: 1fr;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .gallery-item {
            width: 80vw;
            height: 60vh;
          }
        }
      `}</style>
    </main>
  );
}