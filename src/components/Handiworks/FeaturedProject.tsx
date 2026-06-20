"use client";

import "./FeaturedProject.css";
import featuredProjectsContent, {
  FeaturedProject,
} from "./data";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FeaturedProjects = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const featuredProjectCards =
      gsap.utils.toArray<HTMLElement>(".featured-project-card");

    featuredProjectCards.forEach((card, index) => {
      if (index < featuredProjectCards.length - 1) {
        const inner = card.querySelector<HTMLElement>(
          ".featured-project-card-inner"
        );

        if (!inner) return;

        const isMobile = window.innerWidth <= 1000;

        gsap.fromTo(
          inner,
          {
            y: "0%",
            z: 0,
            rotationX: 0,
          },
          {
            y: "-50%",
            z: -250,
            rotationX: 45,
            ease: "none",
            scrollTrigger: {
              trigger: featuredProjectCards[index + 1],
              start: isMobile ? "top 85%" : "top 100%",
              end: "top -75%",
              scrub: true,
              pin: card,
              pinSpacing: false,
            },
          }
        );

        gsap.to(inner, {
          "--after-opacity": 1,
          scrollTrigger: {
            trigger: featuredProjectCards[index + 1],
            start: "top 75%",
            end: "top 0%",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="featured-projects">
      {featuredProjectsContent.map((project: FeaturedProject, index) => (
        <div key={index} className="featured-project-card">
          <div className="featured-project-card-inner">
            <div className="featured-project-card-content">
              <div className="featured-project-card-info">
                <p>{project.info}</p>
              </div>

              <div className="featured-project-card-content-main">
                <div className="featured-project-card-title">
                  <h2>{project.title}</h2>
                </div>

                <div className="featured-project-card-description">
                  <p className="lg">{project.description}</p>
                </div>
              </div>
            </div>

            <div className="featured-project-card-img">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;