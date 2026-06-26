'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScroll } from '@/components/SmoothScroll';
import Image from 'next/image'
import router from 'next/router';
import "./ArtGallery.css"



// If using images from /public
const g1 = '/shadow/art_7.jpg';
const g2 = '/shadow/art_3.jpg';
const g3 = '/shadow/art_1.jpg';
const g4 = '/shadow/art_4.jpg';
const g5 = '/shadow/art_2.jpg';
const g6 = '/shadow/art_6.jpg';
const g7 = '/shadow/art_5.jpg';
const g8 = '/shadow/art_9.jpg';
const g9 = '/shadow/art_10.jpg';
const g10 = '/shadow/art_8.jpg';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Piece = {
  src: string;
  size: 'tall' | 'wide' | 'square';
  index: string;
  title: string;
};

const pieces: Piece[] = [
  {
    src: g1,
    size: 'tall',
    index: '01',
    title: 'Piece 01',
  },
  {
    src: g2,
    size: 'wide',
    index: '02',
    title: 'Piece 02',
  },
  {
    src: g3,
    size: 'tall',
    index: '03',
    title: 'Piece 03',
  },
  {
    src: g4,
    size: 'tall',
    index: '04',
    title: 'Piece 04',
  },
  {
    src: g5,
    size: 'tall',
    index: '05',
    title: 'Piece 05',
  },
  {
    src: g6,
    size: 'wide',
    index: '06',
    title: 'Piece 05',
  },
  {
    src: g7,
    size: 'tall',
    index: '07',
    title: 'Piece 07',
  },
   {
    src: g8,
    size: 'tall',
    index: '08',
    title: 'Piece 08',
  },
   {
    src: g9,
    size: 'tall',
    index: '09',
    title: 'Piece 09',
  },
   {
    src: g10,
    size: 'tall',
    index: '10',
    title: 'Piece 10',
  },
];

export default function GalleryPage() {

  return (
    <SmoothScroll>
      <main className="bg-[#0a0a0a] text-white overflow-hidden">
        <Gallery />
      </main>
    </SmoothScroll>
  );
}

function Gallery() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reduced, isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduced: boolean;
        };

        if (reduced) return;



        // Differentiated parallax speeds per image — alternating depth feel
      
    const speeds = [
        15,
        45,
        20,
        60,
        25,
        50,
        18,
        65,
        30,
        55,
    ];

        const imgs = gsap.utils.toArray<HTMLElement>(
          '.piece-img',
          root.current!
        );

        imgs.forEach((img, i) => {
          const speed = isDesktop
            ? speeds[i % speeds.length]
            : speeds[i % speeds.length] * 0.55;

          gsap.fromTo(
            img,
            { yPercent: -speed },
            {
              yPercent: speed,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        });

        gsap.utils
          .toArray<HTMLElement>('.piece', root.current!)
          .forEach((el) => {
            gsap.from(el, {
              y: 80,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
              },
            });
          });

        const words =
          root.current?.querySelectorAll('.section-title .word') ?? [];

        gsap.from(words, {
          yPercent: 110,
          duration: 1,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <>
    <section
      id="gallery"
      ref={root}
      className="relative px-6 md:px-10 py-32 md:py-48"
    >
      {/* gallery content remains the same */}

      <div className="grid grid-cols-12 gap-y-10 mb-24">
        <div className="col-span-12 md:col-span-3">
          <span className="text-[#c31b07] text-sm uppercase tracking-[0.3em]">
             A Sneak Peek Into Our Shadow Box
          </span>
        </div>

        <h2 className="section-title col-span-12 md:col-span-9 text-4xl md:text-7xl leading-[0.95]">
          {'Six works. Six frames. One obsession with the edge.'
            .split(' ')
            .map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.18em]"
              >
                <span
                  className={`word inline-block ${
                    w === 'obsession' ? 'italic text-[#c31b07]' : ''
                  }`}
                >
                  {w}
                </span>
              </span>
            ))}
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-10">
        {pieces.map((p, i) => {
          const layouts = [
  'col-span-12 md:col-span-7 md:col-start-1 aspect-[3/4]',
  'col-span-12 md:col-span-4 md:col-start-9 md:mt-40 aspect-[4/3]',
  'col-span-12 md:col-span-5 md:col-start-2 md:mt-24 aspect-[3/4]',
  'col-span-12 md:col-span-5 md:col-start-8 aspect-[3/4]',
  'col-span-12 md:col-span-8 md:col-start-3 md:mt-24 aspect-[4/3]',
  'col-span-12 md:col-span-4 md:col-start-2 md:mt-20 aspect-[3/4]',
  'col-span-12 md:col-span-6 md:col-start-7 md:mt-32 aspect-[4/5]',
  'col-span-12 md:col-span-5 md:col-start-1 md:mt-16 aspect-[3/4]',
  'col-span-12 md:col-span-4 md:col-start-9 md:mt-40 aspect-[3/4]',
  'col-span-12 md:col-span-7 md:col-start-4 md:mt-28 aspect-[16/10]',
];

const layout = layouts[i];

          return (
            <article
              key={p.index}
              className={`piece group relative ${layout}`}
            >
              <div className="relative h-full w-full overflow-hidden bg-[#111]">
              <Image
              src={p.src}
              alt={p.title}
              fill
              className="piece-img absolute left-0 right-0 -top-[20%] h-[140%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" /> 
            </div>
    </article>
   );
})}
</div>
 </section>



 {/* CTA section */}
    <section className="cta reveal">
  <div className="cta-content">
    <span className="cta-tag">CRAFT HIVE</span>

    <h2>
      Bring Timeless
      <br />
      Craftsmanship Into
      <br />
      Your Space
    </h2>

    <p>
      Discover shadow boxes, artisan creations, and bespoke pieces
      designed to transform ordinary spaces into memorable experiences.
    </p>

    <div className="cta-actions">
      <button 
      className="cta-btn"
      onClick={() => router.push("/gallery")}
      >
        Explore Collection
      </button>

    <button
    className="cta-btn-outline"
    onClick={() => router.push("/contact")}
   >
    Get In Touch
  </button>
    </div>
  </div>
  <div className="cta-glow"></div>
</section>
</>
  );
}