import "./BrandTicker.css";

const brands = [
  "VOGUE",
  "STUDIO ONE",
  "THE GALLERY",
  "KENTE HOUSE",
  "ACCRA ART",
  "LUMINARY",
  "NATIVE",
  "CULTURE",
];

export default function BrandTicker() {
  return (
    <section className="brand-ticker">
      <div className="brand-ticker-container">
        <div className="brand-ticker-track">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div className="brand-item" key={i}>
              <h2>{brand}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
