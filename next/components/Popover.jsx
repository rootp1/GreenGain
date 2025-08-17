"use client";
import { useState } from 'react';

export default function Popover({ species, onClose }) {
  const [error, setError] = useState("");
  const getWolframImageUrl = (species) => {
    if (!species) return "";
    const formattedSpecies = species.split(" ").join("+");
    return `http://api.wolframalpha.com/v1/simple?appid=9QJ52J-AWQ26Q4U9X&i=${formattedSpecies}%3F`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-green-700">Wolfram Alpha Information</h3>
          <button onClick={onClose} className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white shadow hover:bg-red-600">✕</button>
        </div>
        {error ? (
          <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</div>
        ) : (
          species && (
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getWolframImageUrl(species)}
                alt="Species"
                className="mx-auto max-h-[420px] w-full object-contain"
                onError={() => setError('Failed to load image.')}
              />
            </div>
          )
        )}
        <div className="mt-6 text-right">
          <button onClick={onClose} className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-green-700">Close</button>
        </div>
      </div>
    </div>
  );
}
