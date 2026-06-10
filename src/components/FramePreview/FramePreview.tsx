"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import gsap from "gsap";
import html2canvas from "html2canvas";
import { ArrowRight, Ruler, ImageIcon } from "lucide-react";

import "./FramePreview.css";

import { frameOptions, matColors, sizePresets } from "./FrameData";
import type { FrameOption, MatColor } from "./FrameData";

type SizePreset = "small" | "medium" | "large" | "custom";

type FramePreviewToolProps = {
  title?: string;
  subtitle?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function FramePreviewTool({
  title = "Preview Your Custom Frame",
  subtitle = "Select your artwork type, frame size, mat margin, mat color, and frame finish. The preview updates instantly.",
}: FramePreviewToolProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frameOuterRef = useRef<HTMLDivElement | null>(null);
  const matBoardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const [preset, setPreset] = useState<SizePreset>("medium");
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(16);
  const [frame, setFrame] = useState<FrameOption>(frameOptions[0]);
  const [matColor, setMatColor] = useState<MatColor>(matColors[0]);
  const [matMargin, setMatMargin] = useState(1.5);
  const [artType, setArtType] = useState("Artwork on Paper");
  const [savedFrame, setSavedFrame] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(420);

  useEffect(() => {
    const handleResize = () => setContainerWidth(Math.min(420, window.innerWidth - 96));

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".frame-preview-panel", {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".frame-controls", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePresetChange = (value: SizePreset) => {
    setPreset(value);
    if (value !== "custom") {
      setWidth(sizePresets[value].width);
      setHeight(sizePresets[value].height);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploadedImage(null);
      return;
    }

    setUploadedImage(URL.createObjectURL(file));
  };

  const handleSaveFrame = async () => {
    if (!frameRef.current) return;

    const canvas = await html2canvas(frameRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "CraftHive-Custom-Frame.png";
    link.click();

    setSavedFrame(true);
    setTimeout(() => setSavedFrame(false), 2500);
  };

  const previewSize = useMemo(() => {
    const maxWidth = containerWidth;
    const maxHeight = 520;
    const ratio = width / height;

    let previewWidth = maxWidth;
    let previewHeight = previewWidth / ratio;

    if (previewHeight > maxHeight) {
      previewHeight = maxHeight;
      previewWidth = previewHeight * ratio;
    }

    return { width: previewWidth, height: previewHeight };
  }, [width, height, containerWidth]);

  const frameThickness = useMemo(() => Math.max(18, Math.min(42, (width + height) * 0.9)), [width, height]);
  const matPadding = useMemo(() => Math.max(22, matMargin * 28), [matMargin]);

  useEffect(() => {
    if (frameOuterRef.current) {
      frameOuterRef.current.style.width = `${previewSize.width}px`;
      frameOuterRef.current.style.height = `${previewSize.height}px`;
      frameOuterRef.current.style.padding = `${frameThickness}px`;
      frameOuterRef.current.style.background = frame.texture;
    }

    if (matBoardRef.current) {
      matBoardRef.current.style.padding = `${matPadding}px`;
      matBoardRef.current.style.background = matColor.color;
      matBoardRef.current.style.boxShadow = "inset 0 0 0 1px rgba(0,0,0,.08)";
    }
  }, [previewSize, frameThickness, frame, matPadding, matColor]);

  return (
    <section ref={sectionRef} id="frame-preview-tool" className="frame-tool-section">
      <div className="frame-tool-header">
        <p>Interactive Tool</p>
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>

      <div className="frame-tool-layout">
        <div ref={frameRef} className="frame-preview-panel">
          <div className="preview-stage">
            <div ref={frameOuterRef} className="frame-outer">
              <div ref={matBoardRef} className="mat-board">
                <div className="artwork-window">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Uploaded Artwork" className="uploaded-artwork" />
                  ) : (
                    <div className="artwork-mark">
                      <ImageIcon size={34} />
                      <span>{artType}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="preview-meta">
              <span>{width}" × {height}"</span>
              <span>{frame.name}</span>
              <span>{matMargin}" mat</span>
            </div>
          </div>
        </div>

        <aside className="frame-controls">
          <div className="control-group">
            <label htmlFor="artType">What are you framing?</label>
            <select id="artType" value={artType} onChange={(e) => setArtType(e.target.value)} required>
              <option value="">Please Select</option>
              <option>Artwork on Paper</option>
              <option>Digital Photo</option>
              <option>Certificate</option>
              <option>Canvas Artwork</option>
              <option>Textile / Fabric</option>
              <option>Memory Item</option>
            </select>
          </div>

          {artType === "Digital Photo" && (
            <div className="control-group">
              <label htmlFor="artworkUpload">Upload Your Photo</label>
              <input id="artworkUpload" type="file" accept="image/*" onChange={handleImageUpload} className="image-upload-input" />
            </div>
          )}

          <div className="control-group">
            <label>Frame Size</label>
            <div className="preset-row">
              {(["small", "medium", "large", "custom"] as SizePreset[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePresetChange(item)}
                  className={preset === item ? "active" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="dimension-grid">
            <div className="control-group">
              <label htmlFor="frameWidth">
                <Ruler size={14} /> Width inches
              </label>
              <input
                id="frameWidth"
                type="number"
                min={4}
                max={40}
                value={width}
                onChange={(e) => {
                  setPreset("custom");
                  setWidth(Number(e.target.value));
                }}
              />
            </div>

            <div className="control-group">
              <label htmlFor="frameHeight">
                <Ruler size={14} /> Height inches
              </label>
              <input
                id="frameHeight"
                type="number"
                min={4}
                max={50}
                value={height}
                onChange={(e) => {
                  setPreset("custom");
                  setHeight(Number(e.target.value));
                }}
              />
            </div>
          </div>

          <div className="control-group">
            <label>Customize Your Frame</label>
            <div className="frame-swatches">
              {frameOptions.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  title={item.name}
                  onClick={() => setFrame(item)}
                  className={`frame-swatch ${slugify(item.name)} ${frame.name === item.name ? "selected" : ""}`.trim()}
                />
              ))}
            </div>
            <div className="selected-frame-info">
              <strong>{frame.name}</strong>
              <p>{frame.description}</p>
            </div>
          </div>

          <div className="control-group">
            <label htmlFor="matMargin">Mat Margin: {matMargin}"</label>
            <input
              id="matMargin"
              type="range"
              min={0.5}
              max={4}
              step={0.25}
              value={matMargin}
              onChange={(e) => setMatMargin(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Mat Color</label>
            <div className="mat-swatches">
              {matColors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  title={item.name}
                  onClick={() => setMatColor(item)}
                  className={`mat-swatch ${slugify(item.name)} ${matColor.name === item.name ? "selected" : ""}`.trim()}
                />
              ))}
            </div>
          </div>

          <button type="button" onClick={handleSaveFrame} className="save-frame-btn">
            {savedFrame ? "Frame Saved!" : "Save Frame Design"}
          </button>

          <a href="/contact" className="frame-cta">
            Send Artwork for Quote
            <ArrowRight size={16} />
          </a>
        </aside>
      </div>
    </section>
  );
}

