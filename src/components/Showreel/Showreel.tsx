"use client";

import "./Showreel.css";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LuVolumeX, LuVolume } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

const Showreel: React.FC = () => {
  const showreelSecRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMutedState = !videoRef.current.muted;

    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);

    if (!newMutedState && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1000px)", () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }

        if (!showreelSecRef.current) {
          return () => undefined;
        }

        const trigger = ScrollTrigger.create({
          trigger: showreelSecRef.current,
          start: "top top",
          end: `${window.innerHeight * 2}px`,
          pin: true,
          pinSpacing: true,

          onUpdate: (self) => {
            const progress = self.progress;

            const scaleValue = gsap.utils.mapRange(
              0,
              1,
              0.75,
              1,
              progress
            );

            const borderRadiusValue =
              progress <= 0.5
                ? gsap.utils.mapRange(0, 0.5, 2, 0, progress)
                : 0;

            gsap.set(".showreel-container", {
              scale: scaleValue,
              borderRadius: `${borderRadiusValue}rem`,
            });
          },
        });

        const refreshHandler = () => ScrollTrigger.refresh();

        window.addEventListener("resize", refreshHandler);
        window.addEventListener("orientationchange", refreshHandler);

        return () => {
          trigger.kill();

          window.removeEventListener("resize", refreshHandler);
          window.removeEventListener(
            "orientationchange",
            refreshHandler
          );
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: showreelSecRef }
  );

  return (
    <section className="showreel" ref={showreelSecRef}>
      <div className="showreel-container">
        <video
          ref={videoRef}
          src="/showreel/showreel.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          poster="/showreel/poster.jpg"
        />
      </div>

      <div className="volume-icon" onClick={toggleMute}>
        {isMuted ? (
          <LuVolumeX color="#171412" size={25} />
        ) : (
          <LuVolume color="#171412" size={25} />
        )}
      </div>
    </section>
  );
};

export default Showreel;