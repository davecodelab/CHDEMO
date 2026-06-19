"use client";

import "./Animate.css";
import React, { ReactNode, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

type AnimatesProps = {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
};

export default function Animates({
  children,
  animateOnScroll = true,
  delay = 0,
}: AnimatesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRefs = useRef<HTMLElement[]>([]);
  const splitRefs = useRef<Array<any>>([]);
  const lines = useRef<HTMLElement[]>([]);

  const waitForFonts = async (): Promise<boolean> => {
    try {
      await document.fonts.ready;

      const customFonts = ["Outfit", "Inter", "Sora"];
      const fontCheckPromises: Promise<boolean>[] = customFonts.map((fontFamily) =>
        Promise.resolve(document.fonts.check(`16px ${fontFamily}`))
      );

      await Promise.all(fontCheckPromises);
      await new Promise((resolve) => setTimeout(resolve, 100));

      return true;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return true;
    }
  };

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const initializeSplitText = async () => {
        await waitForFonts();

        splitRefs.current = [];
        lines.current = [];
        elementRefs.current = [];

        let elements: HTMLElement[] = [];
        if (root.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(root.children).filter(
            (el): el is HTMLElement => el instanceof HTMLElement
          );
        } else {
          elements = [root];
        }

        elements.forEach((element) => {
          elementRefs.current.push(element);

          const split = SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
            lineThreshold: 0.1,
          });

          splitRefs.current.push(split);

          const computedStyle = window.getComputedStyle(element);
          const textIndent = computedStyle.textIndent;

          if (textIndent && textIndent !== "0px") {
            if (split.lines.length > 0) {
              const first = split.lines[0] as HTMLElement | undefined;
              if (first) first.style.paddingLeft = textIndent;
            }
            element.style.textIndent = "0";
          }

          lines.current.push(
            ...split.lines.filter((line): line is HTMLElement => line instanceof HTMLElement)
          );
        });

        if (lines.current.length === 0) return;

        gsap.set(lines.current, { y: "100%" });

        const animationProps = {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay,
        } as const;

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: root as any,
              start: "top 90%",
              once: true,
            },
          });
        } else {
          gsap.to(lines.current, animationProps);
        }

        // Recalculate ScrollTrigger positions since SplitText asynchronously modifies the DOM height
        ScrollTrigger.refresh();
      };

      initializeSplitText();

      return () => {
        splitRefs.current.forEach((split) => {
          if (split && typeof split.revert === "function") split.revert();
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children);
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        ref: (el: HTMLDivElement | null) => {
          containerRef.current = el;
        },
      } as any);
    }
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
