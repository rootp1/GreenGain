"use client";
import React, { useState } from 'react';

export default function Marketplace(){
  const MerchItems = [
    { imgSrc: '/images/MangoTree.jpg', title: 'Graphic Print T-Shirt', price: 10 },
  ];
  const AssortedItems = [
    { imgSrc: 'https://img.freepik.com/free-vector/watercolor-winter-solstice-background_23-2149205176.jpg', title: 'NeonFuture #1227', price: 10000 },
  ];
  const StickerItems = [
    { imgSrc: 'https://img.freepik.com/free-vector/muted-color-palette-label-set_23-2150061457.jpg', title: 'Galaxy Sticker Pack #4721', price: 5000 },
  ];
  const badgeItems = [
    { imgSrc: 'https://img.freepik.com/free-vector/save-earth-badges-earth-day_23-2147779442.jpg', title: 'Supernova Badge #9351', price: 8000 },
  ];
  const [shopItems,setShopItems]=useState(StickerItems);
  const [activeLabel,setActiveLabel]=useState('Stickers');
  const setGroup=(lbl)=>{
    setActiveLabel(lbl);
    if(lbl==='Stickers') setShopItems(StickerItems);
    else if(lbl==='Merch') setShopItems(MerchItems);
    else if(lbl==='Badges') setShopItems(badgeItems);
    else setShopItems(AssortedItems);
  };
  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col p-0 font-pixel">
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-6 flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-neutral-200/80 p-6 shadow-lg md:flex-row">
        <div className="w-full space-y-2 md:w-1/2">
          <h2 className="text-3xl font-semibold">Claim Carbon Certificate</h2>
          <p className="text-gray-600">Earn your carbon credit by completing green challenges and supporting eco-friendly activities.</p>
        </div>
        <div className="flex w-full flex-col items-end md:w-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home.png" alt="Carbon" className="mb-3 w-40 rounded shadow" />
          <button className="rounded bg-green-600 px-5 py-2 text-white shadow transition hover:bg-green-700">Claim Now</button>
        </div>
      </div>
  <div className="flex flex-col rounded-xl bg-emerald-700 p-6 text-white shadow-lg overflow-hidden">
        <h2 className="inline rounded-md bg-white px-4 py-1 text-2xl font-semibold text-green-900 shadow">Shop Items</h2>
        <div className="mb-4 mt-6 flex gap-3">
          {['Stickers','Merch','Badges','Assorted'].map(lbl=> (
            <button key={lbl} onClick={()=>setGroup(lbl)} className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition ${activeLabel===lbl? 'bg-green-500 text-white':'bg-white/80 text-gray-800 hover:bg-green-400 hover:text-white'}`}>{lbl}</button>
          ))}
        </div>
        <div className="flex h-80 gap-4 overflow-x-auto overflow-y-hidden pb-3 pt-1 [scrollbar-width:none] [-ms-overflow-style:none]">
          {shopItems.map((item,i)=>(
            <div key={i} className="flex h-72 w-56 flex-shrink-0 flex-col items-center rounded-xl bg-white p-3 text-gray-800 shadow transition hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imgSrc} alt={item.title} className="h-40 w-full rounded-lg object-cover" />
              <h3 className="mt-3 line-clamp-2 text-center text-sm font-semibold leading-snug">{item.title}</h3>
              <p className="mt-1 text-xs text-gray-600">Price: {item.price} CC</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
