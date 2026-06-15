"use client";

import "./FeaturedWork.css";
import { useRef, useEffect } from "react";
import { projects } from "./project";
import { useViewTransition } from "@/hooks/useViewTransition";
import gsap from "gsap";



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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { navigateWithTransition } = useViewTransition();



  useEffect(() => {
    // Handle link clicks gracefully since we're using a normal scroll container now
    const root = scrollContainerRef.current;
    if (!root) return;

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

    // Calculate active item based on center of the screen
    const handleScroll = () => {
      if (!root) return;
      const viewportCenter = window.innerWidth / 2;
      const items = Array.from(root.querySelectorAll(".featured-work-item"));
      
      let closestItem = items[0];
      let minDistance = Infinity;

      items.forEach((item) => {
        const rect = (item as HTMLElement).getBoundingClientRect();
        // Item's absolute center on the screen
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      items.forEach((item) => {
        if (item === closestItem) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    };

    root.addEventListener("scroll", handleScroll);
    // Initialize active class
    setTimeout(handleScroll, 100);

    // Smooth Slideshow Auto-scroll logic
    const interval = setInterval(() => {
      if (root) {
        const { scrollLeft, scrollWidth, clientWidth } = root;
        const firstItem = root.querySelector(".featured-work-item");
        
        if (firstItem) {
          // Calculate the total width to move (item width + gap)
          const style = window.getComputedStyle(firstItem);
          const gap = parseFloat(window.getComputedStyle(root).gap) || 32;
          const moveAmount = firstItem.clientWidth + gap;
          
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            // Smoothly slide back to start over 1.5 seconds
            gsap.to(root, { scrollLeft: 0, duration: 1.5, ease: "power2.inOut" });
          } else {
            // Smoothly slide to the next item
            gsap.to(root, { scrollLeft: scrollLeft + moveAmount, duration: 1.5, ease: "power2.inOut" });
          }
        }
      }
    }, 4500); // Wait 4.5s between slides

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
      root.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      gsap.killTweensOf(root);
    };
  }, [navigateWithTransition]);

  return (
    <div className="featured-work-carousel-container">

      <div className="featured-work-carousel-wrapper">
        <div className="featured-work-list manual-scroll" ref={scrollContainerRef}>
          {projects.map((project, index) => (
            <FeaturedWorkItem project={project as Project} key={`${project.route}-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
