"use client";
import { useRef } from "react";
import Footer from "@/components/ui/Footer";
import Collection from "@/components/CustFrame/Collection";
import Checkers from "@/components/CustFrame/Checkers";
import "./Gallery.css";

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <section ref={sectionRef} className="gallery-section">
        <div className="heading-overlay" />

        <div className="gallery-heading">
          <p>Curated Collection</p>

          <h2>
            Every Frame Tells A Story.
            <br />
            Every Artwork Finds A Home.
          </h2>
        </div>
      </section>

      <Collection />

      <Checkers />

      <Footer />
    </>
  );
}