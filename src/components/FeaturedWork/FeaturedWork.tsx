"use client";

import "./FeaturedWork.css";
import { useRef } from "react";
import { projects } from "./project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  route: string;
  img: string;
  description: string;
  [key: string]: unknown;
};

type FeaturedWorkItemProps = {
  project: Project;
};

function FeaturedWorkItem({ project }: FeaturedWorkItemProps) {
  return (
    <div className="featured-work-item">
      <a href={project.route} className="featured-work-item-link">
        <div className="featured-work-item-img-wrapper">
          <img src={project.img} alt={project.name} className="featured-work-img" />
          <div className="featured-work-overlay"></div>
          <div className="featured-work-item-copy">
            <h3 className="featured-work-title">{project.name}</h3>
            <p className="featured-work-desc">{project.description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function FeaturedWork() {
  const featuredWorkContainerRef = useRef<HTMLDivElement | null>(null);
  const { navigateWithTransition } = useViewTransition();

  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);
  
  useGSAP(() => {
    const root = featuredWorkContainerRef.current;
    const wrapper = carouselWrapperRef.current;
    if (!root || !wrapper) return;

    const section = wrapper.closest('.featured-work');

    // Horizontal Scroll Logic
    const getScrollAmount = () => {
      if (!root) return 0;
      let rootWidth = root.scrollWidth;
      // Provide a buffer so the last item isn't strictly flush against the right edge
      return -(rootWidth - window.innerWidth + 100); 
    };

    const tween = gsap.to(root, {
      x: getScrollAmount,
      ease: "none",
    });

    const st1 = ScrollTrigger.create({
      trigger: section || wrapper,
      start: "top top",
      end: () => `+=${(getScrollAmount() * -1)}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    // Curtain Effect Pin: Stays pinned while the next section (ClientReviews) slides over it
    const st2 = ScrollTrigger.create({
      trigger: section || wrapper,
      start: () => st1.end,
      end: () => `+=${window.innerHeight}`,
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
    
    const handleClick = (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      event.preventDefault();
      const href = anchor.getAttribute("href");
      if (href) {
        navigateWithTransition(href);
      }
    };

    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>(".featured-work-item-link"));
    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
      st1.kill();
      st2.kill();
      tween.kill();
    };
  }, { scope: carouselWrapperRef, dependencies: [navigateWithTransition] });

  return (
    <div className="featured-work-carousel-wrapper" ref={carouselWrapperRef}>
      <div className="featured-work-list" ref={featuredWorkContainerRef}>
        {projects.map((project, index) => (
          <FeaturedWorkItem project={project as Project} key={`${project.route}-${index}`} />
        ))}
      </div>
    </div>
  );
}
