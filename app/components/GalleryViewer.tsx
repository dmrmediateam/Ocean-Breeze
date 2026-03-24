"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
};

type FeaturedGalleryItem = GalleryItem & {
  className: string;
  index: number;
};

type GalleryViewerProps = {
  items: GalleryItem[];
  featuredItems: FeaturedGalleryItem[];
};

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m15 6-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m9 6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 7 17 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 7 7 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function GalleryViewer({
  items,
  featuredItems,
}: GalleryViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + items.length) % items.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % items.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, items.length]);

  const openViewer = (index: number) => {
    if (index < 0) {
      return;
    }

    setActiveIndex(index);
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + items.length) % items.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % items.length,
    );
  };

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const activeDisplayIndex = activeIndex === null ? null : activeIndex + 1;

  return (
    <>
      <div className="gallery__grid">
        {featuredItems.map((item) => (
          <article key={item.src} className={item.className}>
            <button
              type="button"
              className="gallery__card-button"
              onClick={() => openViewer(item.index)}
              aria-label={`Open ${item.label} in gallery viewer`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 34vw"
                className="gallery__image"
              />
              <div className="gallery__label">{item.label}</div>
            </button>
          </article>
        ))}
      </div>

      <div className="gallery__more">
        <button
          type="button"
          className="gallery__more-toggle"
          onClick={() => openViewer(0)}
        >
          <span className="gallery__more-copy">
            <span className="gallery__more-kicker">Complete Collection</span>
            <span className="gallery__more-label">
              View all {items.length} photos
            </span>
          </span>
          <span className="gallery__more-icon" aria-hidden="true">
            <ChevronRight />
          </span>
        </button>
      </div>

      {activeItem ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Ocean Breeze photo gallery"
        >
          <button
            type="button"
            className="gallery-lightbox__backdrop"
            aria-label="Close gallery viewer"
            onClick={() => setActiveIndex(null)}
          />

          <div className="gallery-lightbox__inner">
            <div className="gallery-lightbox__topbar">
              <div className="gallery-lightbox__meta">
                <p className="gallery-lightbox__count">
                  {activeDisplayIndex} / {items.length}
                </p>
                <p className="gallery-lightbox__caption">{activeItem.label}</p>
              </div>

              <button
                type="button"
                className="gallery-lightbox__close"
                onClick={() => setActiveIndex(null)}
                aria-label="Close gallery viewer"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="gallery-lightbox__stage">
              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                onClick={showPrevious}
                aria-label="Previous photo"
              >
                <ChevronLeft />
              </button>

              <div className="gallery-lightbox__image-frame">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="100vw"
                  className="gallery-lightbox__image"
                  priority
                />
              </div>

              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--next"
                onClick={showNext}
                aria-label="Next photo"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="gallery-lightbox__thumbs" aria-label="Gallery thumbnails">
              {items.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  className={`gallery-lightbox__thumb ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show photo ${index + 1}: ${item.label}`}
                >
                  <span className="gallery-lightbox__thumb-image-wrap">
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes="120px"
                      className="gallery-lightbox__thumb-image"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
