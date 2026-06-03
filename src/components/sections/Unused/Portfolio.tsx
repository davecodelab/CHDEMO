'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const works = [
  {
    src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80',
    title: 'The Quiet Wall',
    detail: 'Museum Walnut · Ivory mount',
    year: '2024',
  },
  {
    src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
    title: 'Golden Silence',
    detail: 'Champagne Gold · Stone mount',
    year: '2024',
  },
  {
    src: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=800&q=80',
    title: 'Interior Memory',
    detail: 'Obsidian · Deep Charcoal',
    year: '2023',
  },
  {
    src: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Relic',
    detail: 'Antique Gilt · Ivory mount',
    year: '2023',
  },
  {
    src: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=800&q=80',
    title: 'Light Archive',
    detail: 'Satin Silver · Gallery White',
    year: '2023',
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 380 : -380, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-24 md:py-40 border-t border-white/5 overflow-hidden">
      <div ref={ref} className="px-6 md:px-16 max-w-7xl mx-auto mb-10 flex items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="text-gold font-body text-xs tracking-[0.25em] uppercase mb-4">Selected Works</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-ivory leading-[0.9]">
            Portfolio
            <br />
            <em>&amp; gallery</em>
          </h2>
        </motion.div>

        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
          >
            <ArrowRight size={18} className="text-ivory-dim rotate-180" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
          >
            <ArrowRight size={18} className="text-ivory-dim" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 px-6 md:px-16 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {works.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group shrink-0 w-72 md:w-80 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] hover:border-gold/20 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              <Image
                src={w.src}
                alt={w.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 bg-ink/60 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="font-body text-ivory-dim text-xs">{w.year}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl text-ivory mb-1">{w.title}</h3>
              <p className="font-body text-ivory-dim/60 text-sm">{w.detail}</p>
              <p className="font-body text-gold text-xs tracking-widest uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View project →
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
