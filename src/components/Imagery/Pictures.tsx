"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Pictures.css";
import Copy from "@/components/Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

type GalleryImage = {
  src: string;
  origin: "left" | "right";
};

const images: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
  src: `/photography/gallery-${i + 1}.jpg`,
  origin: i % 2 === 0 ? "left" : "right",
}));

const createStaggeredGrid = (images: GalleryImage[]) => {
  const layout: (GalleryImage | null)[][] = [];

  let index = 0;
  let toggle = true;

  while (index < images.length) {
    const row: (GalleryImage | null)[] = [null, null, null, null];

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

const imageGrid = createStaggeredGrid(images);

export default function Photography() {
  useEffect(() => {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;

    // ensure correct initial state
    gsap.set(".img", {
      scale: 0,
      force3D: true,
    });

    const rows = document.querySelectorAll<HTMLElement>(".row");

    rows.forEach((row) => {
      const rowImages = row.querySelectorAll<HTMLElement>(".img");

      if (!rowImages.length) return;

      // SCALE IN
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

      // SCALE OUT + PIN
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="gallery">
      <div className="gallery-header-content">
        <div className="gallery-header">
          <Copy animateOnScroll delay={0.25}>
            <h1>Collection</h1>
          </Copy>
        </div>

        <div className="gallery-header-copy">
          <Copy animateOnScroll delay={0.25}>
            <p className="lg">
              From intricately crafted woodwork to one-of-a-kind artisan pieces, 
              every creation reflects dedication, skill,
              and a passion for timeless craftsmanship.
            </p>
          </Copy>
        </div>
      </div>

      {imageGrid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((image, colIndex) => (
            <div className="col" key={colIndex}>
              {image && (
                <div className="img" data-origin={image.origin}>
                  <img
                    src={image.src}
                    alt={`Gallery ${rowIndex * 4 + colIndex + 1}`}
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