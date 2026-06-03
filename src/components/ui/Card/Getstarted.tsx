"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import styles from "./getstarted.module.css";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 1,
    subtitle: "Step 01",
    title: "Upload Your Artwork",
    description:
      "Upload a photo, artwork, certificate, canvas, or any piece you'd like to frame.",
    image: "/steps/upload.jpg",
  },
  {
    id: 2,
    subtitle: "Step 02",
    title: "Choose Your Frame",
    description:
      "Browse premium frame styles, colors, finishes, and mat board options.",
    image: "/steps/customize.jpg",
  },
  {
    id: 3,
    subtitle: "Step 03",
    title: "Preview Instantly",
    description:
      "See a realistic visualization of your artwork inside your selected frame.",
    image: "/steps/preview.jpg",
  },
  {
    id: 4,
    subtitle: "Step 04",
    title: "Place Your Order",
    description:
      "Finalize your design and let our craftsmen build your custom frame.",
    image: "/steps/order.jpg",
  },
];

export default function GetStarted() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const cards = cardsRef.current;

    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;

    const cardYOffset = 5;
    const cardScaleStep = 0.075;

    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      });
    });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 8}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,

      onUpdate: (self) => {
        const progress = self.progress;

        const activeIndex = Math.min(
          Math.floor(progress / segmentSize),
          totalCards - 1
        );

        const segProgress =
          (progress - activeIndex * segmentSize) /
          segmentSize;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, {
              yPercent: -250,
              rotationX: 35,
            });
          } else if (i === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(
                -50,
                -200,
                segProgress
              ),
              rotationX: gsap.utils.interpolate(
                0,
                35,
                segProgress
              ),
              scale: 1,
            });
          } else {
            const behindIndex = i - activeIndex;

            const currentYOffset =
              (behindIndex - segProgress) *
              cardYOffset;

            const currentScale =
              1 -
              (behindIndex - segProgress) *
                cardScaleStep;

            gsap.set(card, {
              yPercent: -50 + currentYOffset,
              rotationX: 0,
              scale: currentScale,
            });
          }
        });
      },
    });

    return () => {
      trigger.kill();
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <section className={styles.intro}>
        <p className={styles.eyebrow}>
          Frame Preview Tool
        </p>

        <h1 className={styles.heading}>
          Design Your Perfect Frame
          <br />
          In Four Simple Steps
        </h1>
      </section>

      <section
        ref={sectionRef}
        className={styles.stickyCards}
      >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={styles.card}
          >
            <div className={styles.content}>
              <span className={styles.step}>
                {card.subtitle}
              </span>

              <h2>{card.title}</h2>

              <p>{card.description}</p>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src={card.image}
                alt={card.title}
                fill
                priority={index === 0}
                className={styles.cardImage}
              />
            </div>
          </div>
        ))}
      </section>

      <section className={styles.outro}>
        <h2>Ready To Frame Your Story?</h2>

        <button className={styles.cta}>
          Start Designing
        </button>
      </section>
    </>
  );
}