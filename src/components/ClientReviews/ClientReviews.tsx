"use client";

import { useRef, useState } from "react";
import "./ClientReviews.css";
import { clientReviewsData } from "./clientReviewsData";

const StarRating = () => (
  <div className="review-stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ))}
  </div>
);

const ClientReviews = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="client-reviews-wrapper">
      <div className="container">
        <div 
          className="reviews-grid"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDown ? 'grabbing' : 'grab' }}
        >
          {clientReviewsData.map((item, index) => (
            <div className="static-review-card" key={`review-${index}`}>
              <StarRating />
              <p className="review-text">{item.review}</p>
              <div className="review-author">
                <div className="review-avatar">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.clientName} onError={(e) => { e.currentTarget.style.display = 'none'; }} draggable="false" />
                  ) : (
                    <div className="avatar-placeholder"></div>
                  )}
                </div>
                <div className="review-author-info">
                  <p className="review-client-name">{item.clientName}</p>
                  <p className="review-client-role">{item.clientCompany}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
