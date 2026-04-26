"use client";

import { useState } from "react";

const photos = [
  {
    src: "/about1.png",
    alt: "Chinese Zodiac",
    title: "Chinese Zodiac",
    text: "Chinese Zodiac and Five Elements"
  },
  {
    src: "/about2.png",
    alt: "Ten Gods",
    title: "Ten Gods",
    text: "Getting to Know the Ten Gods"
  },
  {
    src: "/about3.png",
    alt: "Bazi",
    title: "Bazi",
    text: "Ten Gods in Bazi"
  }
];

export default function AboutPage() {
  const [selected, setSelected] = useState(null);

  return (
    <main className="min-h-screen bg-[#030817] px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-center font-serif text-4xl">
          About Astryx
        </h1>

        <div className="grid gap-8 md:grid-cols-3">
          {photos.map((photo) => (
            <button
              key={photo.src}
              onClick={() => setSelected(photo)}
              className="space-y-3 text-center"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="rounded-2xl shadow-lg transition hover:scale-105"
              />

              <h3 className="font-serif text-xl text-purple-200">
                {photo.title}
              </h3>

              <p className="text-white/60">{photo.text}</p>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/"
            className="rounded-full border border-purple-400/40 px-6 py-3 text-sm text-white/70 transition hover:border-purple-300 hover:text-white"
          >
            ← Back Home
          </a>
        </div>
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl rounded-3xl border border-white/10 bg-[#030817] p-4"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-white"
            >
              ✕
            </button>

            <img
              src={selected.src}
              alt={selected.alt}
              className="max-h-[75vh] rounded-2xl object-contain"
            />

            <div className="p-4 text-center">
              <h2 className="font-serif text-2xl text-purple-200">
                {selected.title}
              </h2>
              <p className="mt-2 text-white/60">{selected.text}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
