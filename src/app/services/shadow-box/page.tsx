import Footer from "@/components/ui/Footer";
import "./shadow.css";

const ArtBoxesPage = () => (
  <div className="page">

    {/* ── Hero ─────────────────────────────────────────── */}
    <section className="ab-hero">
      <div className="ab-hero__copy">
        <div className="ab-hero__eyebrow"><span>Heritage · Craft · Art</span></div>
        <h1>Art Boxes<br /><em>Stories Framed</em></h1>
        <p>
          Discover unique mixed-media compositions that celebrate the rich
          cultural heritage of African artistry through sophisticated design.
        </p>
        <div className="ab-hero__actions">
          <a href="#work" className="btn btn-red">Explore Collection</a>
          <a href="#gallery" className="btn btn-outline">View Gallery</a>
        </div>
      </div>
      <div className="ab-hero__img">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&q=80"
          alt="Ornate African art box with decorative medallions"
        />
        <span className="bracket bracket--tl" />
        <span className="bracket bracket--br" />
      </div>
    </section>

    {/* ── Feature 1 ─────────────────────────────────────── */}
    <section className="feature" id="work">
      <div className="feature__img">
        <img
          src="https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?w=900&q=80"
          alt="Traditional African symbolic artwork detail"
        />
      </div>
      <div className="feature__copy">
        <span className="sec-label">Heritage</span>
        <h2>Crafting stories through traditional African symbolism</h2>
        <p>
          Craftline's Art Boxes blend cultural narratives with contemporary
          design, transforming traditional symbols into modern artistic
          expressions that endure across generations.
        </p>
        <div className="feature__actions">
          <a href="#" className="btn btn-red">Explore</a>
          <a href="#" className="btn btn-ghost">View more</a>
        </div>
      </div>
    </section>

    {/* ── Materials ──────────────────────────────────────── */}
    <section className="materials">
      <div className="materials__head">
        <h2>Made from the earth,<br />shaped by hand</h2>
        <p>
          Every piece is crafted from natural, sustainably sourced materials
          that honour centuries of artisan tradition across the continent.
        </p>
      </div>
      <div className="materials-grid">
        {[
          { n: "01", name: "Jute Materials",   desc: "Natural fibres that connect us with traditional African craftsmanship and slow making." },
          { n: "02", name: "Plantain Bark",     desc: "Sustainable materials that tell a story of cultural resilience and ecological care." },
          { n: "03", name: "Brass Elements",    desc: "Metalwork reflecting the intricate details of African artistic tradition and heritage." },
          { n: "04", name: "Wooden Designs",    desc: "Handcrafted wooden components that showcase exceptional artisan skill and patience." },
        ].map(m => (
          <div className="mat-card" key={m.n}>
            <div className="mat-card__num">{m.n}</div>
            <h3>{m.name}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── Feature 2 ─────────────────────────────────────── */}
    <section className="feature flip">
      <div className="feature__img">
        <img
          src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=900&q=80"
          alt="Close detail of an art box surface pattern"
        />
      </div>
      <div className="feature__copy">
        <span className="sec-label">Craft</span>
        <h2>Every box carries a hundred-year story</h2>
        <p>
          Each piece passes through the hands of master craftspeople whose
          techniques have been refined across generations. No two boxes are
          ever exactly alike — that is the point.
        </p>
        <div className="feature__actions">
          <a href="#" className="btn btn-red">Explore</a>
          <a href="#" className="btn btn-ghost">View more</a>
        </div>
      </div>
    </section>

    {/* ── Gallery ────────────────────────────────────────── */}
    <section className="gallery" id="gallery">
      <div className="gallery__head">
        <h2>Art Box Gallery</h2>
        <p>A curated collection of unique mixed-media art compositions.</p>
      </div>
      <div className="gallery-grid">
        {[
          { wide: true,  src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&q=75", alt: "Featured art box" },
          { wide: false, src: "https://images.unsplash.com/photo-1605465017374-2a2d00e4cb4f?w=600&q=75",  alt: "Art box detail 2" },
          { wide: false, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75",  alt: "Art box detail 3" },
          { wide: false, src: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?w=600&q=75", alt: "Art box detail 4" },
          { wide: true,  src: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1000&q=75", alt: "Art box gallery wide" },
        ].map((g, i) => (
          <div className={`g-item${g.wide ? " g-item--wide" : ""}`} key={i}>
            <img src={g.src} alt={g.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>

    {/* ── Footer strip ──────────────────────────────────── */}
    <Footer />
  </div>
);

export default ArtBoxesPage;
