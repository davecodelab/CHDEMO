"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Checkers.css";
import Copy from "@/components/Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

type CheckersImage = {
  src: string;
  origin: "left" | "right";
};

const checkersImages: CheckersImage[] = Array.from({ length: 14 }, (_, i) => ({
  src: `/gallery/checkers/check-${i + 1}.jpg`,
  origin: i % 2 === 0 ? "left" : "right",
}));

const createStaggeredCheckers = (images: CheckersImage[]) => {
  const layout: (CheckersImage | null)[][] = [];

  let index = 0;
  let toggle = true;

  while (index < images.length) {
    const row: (CheckersImage | null)[] = [null, null, null, null];

    if (toggle) {
      if (index < images.length) row[0] = images[index++];
      if (index < images.length) row[2] = images[index++];
    } else {
      if (index < images.length) row[1] = images[index++];
      if (index < images.length) row[3] = images[index++];
    }

    layout.push(row);
    toggle = !toggle;
  }

  return layout;
};

const checkersGrid = createStaggeredCheckers(checkersImages);

export default function Checkers() {
  useEffect(() => {
    const checkers = document.querySelector(".checkers");
    if (!checkers) return;

    gsap.set(".img", {
      scale: 0,
      force3D: true,
    });

    const rows = document.querySelectorAll<HTMLElement>(".row");

    rows.forEach((row) => {
      const rowImages = row.querySelectorAll<HTMLElement>(".img");

      if (!rowImages.length) return;

      ScrollTrigger.create({
        trigger: row,
        start: "top bottom",
        end: "bottom bottom-=20%",
        scrub: 1,

        onUpdate(self) {
          const progress = self.progress;
          const eased = Math.min(1, progress * 1.2);

          const scaleValue = gsap.utils.interpolate(0, 1, eased);

          rowImages.forEach((img) => {
            gsap.set(img, {
              scale: scaleValue,
              force3D: true,
            });
          });
        },
      });

      ScrollTrigger.create({
        trigger: row,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 1,

        onUpdate(self) {
          const scale = gsap.utils.interpolate(1, 0, self.progress);

          rowImages.forEach((img) => {
            gsap.set(img, {
              scale,
              force3D: true,
            });
          });
        },
      });
    });

    const handleResize = () => ScrollTrigger.refresh();

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="checkers">
        <div className="checkers-grain"/>

      <div className="checkers-header-content">
        <div className="checkers-header">
          <Copy>
            <h1>Our Collection</h1>
          </Copy>
        </div>

        <div className="checkers-header-copy">
          <Copy>
            <p className="lg">
              From intricately crafted woodwork to one-of-a-kind artisan pieces,
              every creation reflects dedication, skill, and a passion for
              timeless craftsmanship.
            </p>
          </Copy>
        </div>
      </div>

      {checkersGrid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((image, colIndex) => (
            <div className="col" key={colIndex}>
              {image && (
                <div className="img" data-origin={image.origin}>
                  <img
                    src={image.src}
                    alt={`Checkers ${rowIndex * 4 + colIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}