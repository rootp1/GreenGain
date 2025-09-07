"use client";
import { Card } from './ui';

export default function TreeCard({ imageurl, treename, species, date, co2 }) {
  return (
    <Card padding="small" className="flex h-64 w-64 flex-col items-center justify-center border-4 border-black bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="h-3/5 w-11/12 rounded-xl object-cover" src={imageurl} alt={treename} />
      <div className="mt-2 flex flex-col items-center text-sm">
        <div className="font-semibold">{treename}</div>
        <div>{species}</div>
        <div>{date}</div>
        <div className="font-medium text-emerald-600">{co2} kg/year</div>
      </div>
    </Card>
  );
}
