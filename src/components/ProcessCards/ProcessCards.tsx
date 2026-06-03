"use client";

import * as React from "react";
import { useEffect } from "react";
import "./ProcessCards.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProcessCardData = {
  index: string;
  title: string;
  image: string;
  description: string;
};

const processCardsData: ProcessCardData[] = [
  {
    index: "01",
    title: "Craftmanship",
    image: "/process/craftmanship.jpg",
    description:
      "Excellence in every frame and artwork.",
  },
  {
    index: "02",
    title: "Creativity",
    image: "/process/creativity.jpg",
    description:
      "Unique artistic expression and innovation.",
  },
  {
    index: "03",
    title: "Integrity",
    image: "/process/integrity.jpg",
    description:
      "Honesty and transparency in all we do.",
  },
  {
    index: "04",
    title: "Preservation",
    image: "/process/preservation.jpg",
    description:
      "Protecting memories and restoring art for future generations.", 
  },
];

const ProcessCards: React.FC = () => {
  useEffect(() => {
    const processCards = Array.from(
      document.querySelectorAll<HTMLDivElement>(".process-card")
    );

    processCards.forEach((card, index) => {
      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: processCards[processCards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `card-pin-${index}`,
        });
      }

      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: processCards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.25;
            const rotation = (index % 2 === 0 ? 5 : -5) * progress;
            const afterOpacity = progress;

            gsap.set(card, {
              scale,
              rotation,
              "--after-opacity": afterOpacity,
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(processCards);
    };
  }, []);

  return (
    <div className="process-cards">
      {processCardsData.map((cardData) => (
        <div key={cardData.index} className="process-card">
          <div className="process-card-index">
            <h1>{cardData.index}</h1>
          </div>
          <div className="process-card-content">
            <div className="process-card-content-wrapper">
              <h1 className="process-card-header">{cardData.title}</h1>

              <div className="process-card-img">
                <img src={cardData.image} alt={cardData.title} />
              </div>

              <div className="process-card-copy">
                <div className="process-card-copy-title">
                  <p className="caps">(About the state)</p>
                </div>
                <div className="process-card-copy-description">
                  <p>{cardData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCards;
