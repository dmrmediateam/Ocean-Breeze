import { readdir } from "node:fs/promises";
import path from "node:path";
import GalleryViewer from "./GalleryViewer";

const featuredGalleryItems = [
  {
    src: "/images/rooftop.webp",
    alt: "Ocean Breeze pool and terrace at golden hour",
    label: "Pool",
    className: "gallery__item gallery__item--featured",
  },
  {
    src: "/images/dock-aerial.webp",
    alt: "Aerial view of the Ocean Breeze overwater dock",
    label: "Overwater Dock",
    className: "gallery__item",
  },
  {
    src: "/images/kitchen.webp",
    alt: "Gourmet kitchen with copper pendants and blue lighting",
    label: "Gourmet Kitchen",
    className: "gallery__item",
  },
  {
    src: "/images/living.webp",
    alt: "Living room with wood finishes and sculpted lighting",
    label: "Living Room",
    className: "gallery__item",
  },
  {
    src: "/images/dock-sunset.webp",
    alt: "Golden sunset at the private dock",
    label: "The Dock",
    className: "gallery__item",
  },
];

const imageLabels: Record<string, string> = {
  "dock-aerial.webp": "Overwater Dock",
  "dock-sunset.webp": "The Dock",
  "hero-poster.webp": "Twilight Pool",
  "kitchen.webp": "Gourmet Kitchen",
  "living.webp": "Living Room",
  "living2.webp": "Great Room",
  "rooftop.webp": "Pool",
};

function formatImageLabel(fileName: string) {
  const label = imageLabels[fileName];

  if (label) {
    return label;
  }

  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/ocean breeze villa/gi, "")
    .replace(/high/gi, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function Gallery() {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const imageFiles = await readdir(imagesDirectory);

  const allGalleryItems = imageFiles
    .filter((fileName) => /\.(jpe?g|png|webp)$/i.test(fileName))
    .filter((fileName) => !fileName.toLowerCase().includes("logo"))
    .sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }),
    )
    .map((fileName) => ({
      src: `/images/${fileName}`,
      alt: `${formatImageLabel(fileName)} at Ocean Breeze`,
      label: formatImageLabel(fileName),
    }));

  const featuredItems = featuredGalleryItems.map((item) => ({
    ...item,
    index: allGalleryItems.findIndex((galleryItem) => galleryItem.src === item.src),
  }));

  return (
    <section className="gallery" id="gallery">
      <p className="section-eyebrow section-eyebrow--accent">The Villa</p>
      <GalleryViewer items={allGalleryItems} featuredItems={featuredItems} />
    </section>
  );
}
