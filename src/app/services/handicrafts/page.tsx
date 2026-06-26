"use client";

import {useRef } from "react";
import Pictures from "@/components/Imagery/Pictures"
import gsap from "gsap";
import Footer from "@/components/ui/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/Handicraft/Textreveal";
import Handiworks from "@/components/Handiworks/FeaturedProject"
import Copy from "@/components/Copy/Copy"
import "./handicraft.css"
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";



gsap.registerPlugin(ScrollTrigger,useGSAP);

export default function HandicraftsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useGSAP(
  () => {
    gsap.from(".cta-tag", {
      y: 40,
      opacity: 0,
      duration: 1,
      scrollTrigger: ".cta",
    });

    gsap.from(".cta h2", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      scrollTrigger: ".cta",
    });

    gsap.from(".cta p", {
      y: 40,
      opacity: 0,
      delay: 0.2,
      duration: 1,
      scrollTrigger: ".cta",
    });

    gsap.from(".cta-actions", {
      y: 40,
      opacity: 0,
      delay: 0.4,
      duration: 1,
      scrollTrigger: ".cta",
    });
  },
  { scope: pageRef }
);

  return (
    <>
      <main ref={pageRef} className="page">
        <TextReveal />
        <section className="featured-projects-container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Handicraft Series</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>Explore our collection of authentic handcrafted décor and art</h2>
            </Copy>
          </div>
        <Handiworks/>
      </section>

    <section >
    <Pictures />
   </section>

<section className="cta">
  <div className="cta-content">
    <span className="cta-tag">CRAFT HIVE</span>

    <h2>
      Bring Timeless
      <br />
      Craftsmanship Into
      <br />
      Your Space
    </h2>

    <p>
      Discover handcrafted décor, artisan creations, and bespoke pieces
      designed to transform ordinary spaces into memorable experiences.
    </p>

    <div className="cta-actions">
      <button 
      className="cta-btn"
      onClick={() => router.push("/gallery")}
      >
        Explore Collection
      </button>

    <button
    className="cta-btn-outline"
    onClick={() => router.push("/contact")}
   >
    Get In Touch
  </button>
    </div>
  </div>

  <div className="cta-glow"></div>
</section>
        <Footer />
      </main>
    </>
  );
}