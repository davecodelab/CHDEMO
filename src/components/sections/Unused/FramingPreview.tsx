'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Upload, ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  RotateCcw, Sparkles, MessageCircle, Check, Sun, Moon, Flame
} from 'lucide-react';

const frames = [
  { id: 'obsidian', name: 'Obsidian', color: '#0A0A0A', secondColor: '#1a1a1a', width: 28, material: 'Matte ebony', price: 0 },
  { id: 'walnut', name: 'Museum Walnut', color: '#4A2C17', secondColor: '#6B3E24', width: 36, material: 'Hand-oiled walnut', price: 80 },
  { id: 'gold', name: 'Champagne Gold', color: '#B8923A', secondColor: '#D4A95F', width: 32, material: 'Brushed brass', price: 200 },
  { id: 'silver', name: 'Satin Silver', color: '#7A7A7A', secondColor: '#ACACAC', width: 30, material: 'Polished aluminium', price: 120 },
  { id: 'white', name: 'Gallery White', color: '#E8E0D0', secondColor: '#F4EFE8', width: 24, material: 'Satin lacquer', price: 60 },
  { id: 'gilt', name: 'Antique Gilt', color: '#8B6914', secondColor: '#C9A227', width: 42, material: 'Gold leaf on gesso', price: 350 },
];

const mounts = [
  { id: 'ivory', name: 'Ivory', color: '#F2E8D5', textColor: '#333' },
  { id: 'stone', name: 'Warm Stone', color: '#C8BBA8', textColor: '#333' },
  { id: 'charcoal', name: 'Deep Charcoal', color: '#1C1C1C', textColor: '#fff' },
  { id: 'white', name: 'Gallery White', color: '#FAFAF8', textColor: '#333' },
  { id: 'blush', name: 'Rose Blush', color: '#D4A99A', textColor: '#333' },
  { id: 'slate', name: 'Slate Blue', color: '#6B7B8D', textColor: '#fff' },
];

const rooms = [
  { id: 'gallery', label: 'White Gallery', icon: Sun, bg: 'from-[#F2EDE4] to-[#E8E0D6]', wall: '#F5F0E8', light: '#FFF8F0' },
  { id: 'dark', label: 'Dark Collector', icon: Moon, bg: 'from-[#0E0C0A] to-[#050404]', wall: '#100E0C', light: '#3D2A1A' },
  { id: 'warm', label: 'Living Room', icon: Flame, bg: 'from-[#7A5230] to-[#C4956A]', wall: '#8B6345', light: '#FFCC88' },
];

const sampleArtworks = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80',
];

type TabId = 'frame' | 'mount' | 'room';

export default function FramingPreview() {
  const [artwork, setArtwork] = useState(sampleArtworks[0]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [frame, setFrame] = useState(frames[1]);
  const [mount, setMount] = useState(mounts[0]);
  const [mountSize, setMountSize] = useState(40);
  const [room, setRoom] = useState(rooms[0]);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('frame');
  const [showQuote, setShowQuote] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setArtwork(reader.result as string);
      setIsUploaded(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const price = 450 + frame.price + Math.round(mountSize * 4.5);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'frame', label: 'Frame' },
    { id: 'mount', label: 'Mount' },
    { id: 'room', label: 'Room' },
  ];

  return (
    <section id="preview" className="py-24 md:py-40 px-4 md:px-8 lg:px-16 bg-[#0E0C0A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <p className="text-gold font-body text-xs tracking-[0.25em] uppercase mb-4">Signature Tool</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-ivory leading-[0.9] mb-6">
            Preview your frame
            <br />
            <em>before you order</em>
          </h2>
          <p className="font-body text-ivory-dim text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Upload your artwork, choose a frame, pick your mount, and see exactly how it will look—before we ever lift a tool.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-6">
          {/* ── Controls panel ── */}
          <aside className="bg-[#0B0908] border border-white/[0.07] rounded-3xl overflow-hidden flex flex-col">
            {/* Upload */}
            <div className="p-5 border-b border-white/[0.06]">
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl border border-dashed border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Upload size={18} className="text-gold" />
                </div>
                <div className="text-left">
                  <p className="font-body text-ivory text-sm font-medium">
                    {isUploaded ? 'Change artwork' : 'Upload your artwork'}
                  </p>
                  <p className="font-body text-ivory-dim text-xs mt-0.5">JPG, PNG, WEBP up to 20MB</p>
                </div>
                {isUploaded && <Check size={16} className="ml-auto text-gold" />}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

              {/* Sample artworks */}
              {!isUploaded && (
                <div className="mt-3">
                  <p className="font-body text-ivory-dim/50 text-xs tracking-widest uppercase mb-2">Or choose a sample</p>
                  <div className="flex gap-2">
                    {sampleArtworks.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setArtwork(src)}
                        className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${artwork === src ? 'border-gold' : 'border-transparent hover:border-white/30'}`}
                      >
                        <Image src={src} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.06]">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 py-3.5 font-body text-xs tracking-widest uppercase transition-all duration-300 ${
                    activeTab === t.id
                      ? 'text-gold border-b-2 border-gold bg-gold/5'
                      : 'text-ivory-dim hover:text-ivory'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ maxHeight: 420 }}>
              <AnimatePresence mode="wait">
                {activeTab === 'frame' && (
                  <motion.div
                    key="frame"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    {frames.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFrame(f)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-300 text-left ${
                          frame.id === f.id
                            ? 'border-gold/60 bg-gold/8'
                            : 'border-white/[0.07] hover:border-white/20 bg-white/[0.02]'
                        }`}
                      >
                        {/* Frame swatch */}
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 ring-1 ring-white/20"
                          style={{
                            background: `linear-gradient(135deg, ${f.secondColor}, ${f.color})`,
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-ivory text-sm font-medium truncate">{f.name}</p>
                          <p className="font-body text-ivory-dim/60 text-xs mt-0.5">{f.material} · {f.width}mm</p>
                        </div>
                        {frame.id === f.id && <Check size={14} className="text-gold shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'mount' && (
                  <motion.div
                    key="mount"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {mounts.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMount(m)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${
                            mount.id === m.id
                              ? 'border-gold/60 bg-gold/5'
                              : 'border-white/[0.07] hover:border-white/20'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-xl ring-1 ring-white/20"
                            style={{ background: m.color }}
                          />
                          <p className="font-body text-ivory-dim text-xs text-center leading-tight">{m.name}</p>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-body text-ivory text-sm">Mount depth</p>
                        <span className="font-body text-gold text-sm font-medium">{mountSize}mm</span>
                      </div>
                      <input
                        type="range" min={10} max={80} value={mountSize}
                        onChange={(e) => setMountSize(+e.target.value)}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="font-body text-ivory-dim/40 text-xs">Slim 10mm</span>
                        <span className="font-body text-ivory-dim/40 text-xs">Deep 80mm</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'room' && (
                  <motion.div
                    key="room"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {rooms.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRoom(r)}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl border transition-all duration-300 ${
                          room.id === r.id
                            ? 'border-gold/60 bg-gold/5'
                            : 'border-white/[0.07] hover:border-white/20 bg-white/[0.02]'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.bg} shrink-0`} />
                        <div className="text-left">
                          <p className="font-body text-ivory text-sm font-medium">{r.label}</p>
                          <p className="font-body text-ivory-dim/60 text-xs mt-0.5">Room atmosphere</p>
                        </div>
                        <r.icon size={16} className={room.id === r.id ? 'text-gold ml-auto' : 'text-ivory-dim/40 ml-auto'} />
                      </button>
                    ))}

                    {/* Artwork controls */}
                    <div className="pt-2 border-t border-white/[0.06]">
                      <p className="font-body text-ivory/60 text-xs tracking-widest uppercase mb-3">Artwork Position</p>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold/40 transition-colors"><ZoomOut size={14} className="text-ivory-dim" /></button>
                        <span className="font-body text-ivory text-sm">Zoom {zoom.toFixed(1)}×</span>
                        <button onClick={() => setZoom(Math.min(2.5, zoom + 0.1))} className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center hover:border-gold/40 transition-colors"><ZoomIn size={14} className="text-ivory-dim" /></button>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-body text-ivory/60 text-xs">Rotation</p>
                          <span className="font-body text-gold text-xs">{rotation}°</span>
                        </div>
                        <input type="range" min={-25} max={25} value={rotation} onChange={(e) => setRotation(+e.target.value)} className="w-full" />
                      </div>
                      <button
                        onClick={() => { setZoom(1); setRotation(0); }}
                        className="mt-2 flex items-center gap-1.5 text-ivory-dim/50 hover:text-ivory-dim text-xs font-body transition-colors"
                      >
                        <RotateCcw size={12} /> Reset position
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quote bar */}
            <div className="p-5 border-t border-white/[0.06] bg-[#080706]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-body text-ivory-dim/60 text-xs tracking-widest uppercase">Estimated Quote</p>
                  <p className="font-display text-3xl text-gold mt-0.5">GHS {price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setShowQuote(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gold text-ink font-body text-xs tracking-widest uppercase font-semibold hover:bg-gold/90 transition-colors"
                >
                  <MessageCircle size={14} />
                  Order
                </button>
              </div>
              <p className="font-body text-ivory-dim/40 text-xs">Includes frame, mount, UV glass &amp; delivery</p>
            </div>
          </aside>

          {/* ── Stage ── */}
          <div
            className="relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[700px] flex items-center justify-center"
            style={{ background: `linear-gradient(145deg, ${room.wall}, ${room.wall}dd)` }}
          >
            {/* Ambient wall light */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 rounded-full blur-[100px] opacity-60 pointer-events-none"
              style={{ background: room.light }}
            />

            {/* Wall texture subtle lines */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0,0,0,0.5) 60px, rgba(0,0,0,0.5) 61px)',
              }}
            />

            {/* The framed piece */}
            <motion.div
              key={`${frame.id}-${mount.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
              style={{
                padding: frame.width,
                background: `linear-gradient(135deg, ${frame.secondColor}, ${frame.color}, ${frame.secondColor} 60%, ${frame.color})`,
                boxShadow: `
                  0 50px 140px rgba(0,0,0,0.5),
                  0 20px 60px rgba(0,0,0,0.3),
                  inset 0 1px 0 rgba(255,255,255,0.15),
                  inset 0 -1px 0 rgba(0,0,0,0.4)
                `,
              }}
            >
              {/* Inner bevel shadow on frame */}
              <div
                className="absolute inset-0"
                style={{
                  boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.08), inset 0 -2px 6px rgba(0,0,0,0.4)',
                  pointerEvents: 'none',
                }}
              />

              {/* Mount */}
              <div
                style={{
                  padding: mountSize,
                  background: mount.color,
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.12)',
                }}
              >
                {/* Artwork */}
                <div
                  className="relative overflow-hidden"
                  style={{ width: 'clamp(200px, 36vw, 480px)', height: 'clamp(240px, 44vw, 560px)' }}
                >
                  <img
                    src={artwork}
                    alt="Your artwork"
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
                  />
                  {/* Glass reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* AI suggestion chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-6 right-6 bg-ink/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[220px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-gold" />
                <span className="font-body text-gold text-xs tracking-wider uppercase">Suggestion</span>
              </div>
              <p className="font-body text-ivory-dim text-xs leading-relaxed">
                {frame.id === 'walnut' && mount.id === 'ivory'
                  ? 'Perfect pairing. Walnut with ivory mount gives a warm, museum-quality finish.'
                  : frame.id === 'gold'
                  ? 'Bold choice. Gold frame elevates any artwork to collector status.'
                  : frame.id === 'obsidian'
                  ? 'Clean and contemporary. Obsidian frame lets the artwork speak.'
                  : 'Great selection. Our framers will bring this to life with precision.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quote modal */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-ink/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setShowQuote(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0E0C0A] border border-white/10 rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-3xl text-ivory mb-2">Request a Quote</h3>
              <p className="font-body text-ivory-dim text-sm mb-6">
                Your selection: <span className="text-gold">{frame.name} frame</span>, <span className="text-gold">{mount.name} mount</span> ({mountSize}mm)
              </p>
              <div className="space-y-3">
                <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 font-body text-ivory text-sm placeholder:text-ivory-dim/40 focus:outline-none focus:border-gold/40" placeholder="Your name" />
                <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 font-body text-ivory text-sm placeholder:text-ivory-dim/40 focus:outline-none focus:border-gold/40" placeholder="Email or phone" />
                <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 font-body text-ivory text-sm placeholder:text-ivory-dim/40 focus:outline-none focus:border-gold/40 min-h-[100px] resize-none" placeholder="Artwork size, special requirements..." />
              </div>
              <button className="mt-5 w-full py-4 rounded-2xl bg-gold text-ink font-body text-sm tracking-widest uppercase font-semibold hover:bg-gold/90 transition-colors">
                Send Quote Request
              </button>
              <p className="font-body text-ivory-dim/40 text-xs text-center mt-3">
                Estimated total: GHS {price.toLocaleString()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
