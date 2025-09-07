"use client";
import React, { useState } from 'react';
import { Button, Card } from '../../../components/ui';
import { IMAGES } from '../../../lib/constants';

export default function Marketplace(){
  const MerchItems = [
    { imgSrc: IMAGES.MANGO_TREE, title: 'Graphic Print T-Shirt', price: 10 },
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
        <Card variant="neutral" padding="medium" className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="w-full space-y-2 md:w-1/2">
            <h2 className="text-3xl font-semibold">Claim Carbon Certificate</h2>
            <p className="text-gray-600">Earn your carbon credit by completing green challenges and supporting eco-friendly activities.</p>
          </div>
          <div className="flex w-full flex-col items-end md:w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.HOME} alt="Carbon" className="mb-3 w-40 rounded shadow" />
            <Button variant="primary" size="medium">
              Claim Now
            </Button>
          </div>
        </Card>
        
        <Card variant="green" padding="medium" className="bg-emerald-700 text-white overflow-hidden">
          <h2 className="inline rounded-md bg-white px-4 py-1 text-2xl font-semibold text-green-900 shadow">Shop Items</h2>
          <div className="mb-4 mt-6 flex gap-3">
            {['Stickers','Merch','Badges','Assorted'].map(lbl=> (
              <Button 
                key={lbl} 
                onClick={()=>setGroup(lbl)} 
                variant={activeLabel===lbl ? "primary" : "secondary"}
                size="small"
                className={`flex-1 text-center text-sm font-medium transition ${
                  activeLabel===lbl 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-white/80 text-gray-800 hover:bg-green-400 hover:text-white border-white/80'
                }`}
              >
                {lbl}
              </Button>
            ))}
          </div>
          <div className="flex h-80 gap-4 overflow-x-auto overflow-y-hidden pb-3 pt-1 [scrollbar-width:none] [-ms-overflow-style:none]">
            {shopItems.map((item,i)=>(
              <Card 
                key={i} 
                padding="small" 
                className="flex h-72 w-56 flex-shrink-0 flex-col items-center bg-white text-gray-800 transition hover:scale-[1.02]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imgSrc} alt={item.title} className="h-40 w-full rounded-lg object-cover" />
                <h3 className="mt-3 line-clamp-2 text-center text-sm font-semibold leading-snug">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-600">Price: {item.price} CC</p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
