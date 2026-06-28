"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/ui/Footer"

import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

const artworks = [
  "/gallery/art_1.jpg",
  "/gallery/art-2.jpg",
  "/gallery/art-3.jpg",
  "/gallery/art-4.jpg",
  "/gallery/art-5.jpg",
  "/gallery/art-6.jpg",
  "/gallery/art-7.jpg",
  "/gallery/art-8.jpg",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".gallery-card");

    cards.forEach((card: any, index) => {
      gsap.fromTo(
        card,
        {
          y: 150,
          opacity: 0,
          scale: 0.85,
          rotate: gsap.utils.random(-4, 4),
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );

      gsap.to(card, {
        y: index % 2 === 0 ? -120 : -70,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    gsap.to(".gallery-word", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return(
  <>
    <section ref={sectionRef} className="gallery-section">
      <div className="gallery-heading">
        <p>Curated Collection</p>

        <h2>
          Every Frame Tells A Story.
          <br />
          Every Artwork Finds A Home.
        </h2>
      </div>

      <div className="floating-gallery">
        {artworks.map((image, index) => (
          <GalleryCard key={index} image={image} />
        ))}
      </div>
    </section>
    <Footer />
  </>
);
}

function GalleryCard({ image }: { image: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(card, {
      rotateY: (x / rect.width - 0.5) * 12,
      rotateX: -(y / rect.height - 0.5) * 12,
      duration: 0.5,
    });
  };

  const reset = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
    });
  };

  return (
    <div
      ref={cardRef}
      className="gallery-card"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div className="frame">
        <Image
          src={image}
          alt=""
          fill
          className="frame-image"
        />
      </div>
    </div>
   
  );
}