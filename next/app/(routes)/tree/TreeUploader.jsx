"use client";
import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { predictSpecies, api1 } from '../../../components/api';
import { toast } from 'react-toastify';
import Popover from '../../../components/Popover';

export default function TreeUploader() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState('');
  const [treeName, setTreeName] = useState('');
  const [climate, setClimate] = useState('');
  const [soilType, setSoilType] = useState('');
  const [description, setDescription] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [trees, setTrees] = useState([]);
  const [loadingTrees, setLoadingTrees] = useState(false);

  const fetchTrees = async () => {
    setLoadingTrees(true);
    try {
      const { data } = await api1.get('/tree/gettree');
      setTrees(data || []);
    } catch (e) {
      console.error('Failed to load trees', e);
    } finally {
      setLoadingTrees(false);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      toast.error('Please select an image!');
      return;
    }
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(image, options);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        // Derive a safe filename for backend (must send fileName per API contract)
        const originalName = image.name || imageName || 'tree-image.jpg';
        const safeName = originalName.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
        try {
          const response = await api1.post('/upload', { file: base64, fileName: safeName });
          setImageUrl(response.data.url);
          toast.success('Image uploaded successfully!');
        } catch (error) {
          console.error('Error uploading image:', error.response?.data || error.message);
          toast.error('Upload failed: ' + (error.response?.data?.error || 'Server error'));
        }
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Image compression failed:', error);
      toast.error('Failed to compress image!');
    }
  };

  useEffect(() => {
    if (imageUrl) {
      (async () => {
        try {
          const prediction = await predictSpecies(imageUrl);
          setSpecies(prediction);
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
              },
              (error) => {
                console.error('Error getting location:', error);
                toast.error('Failed to retrieve location.');
              }
            );
          } else {
            toast.error('Geolocation not supported.');
          }
        } catch (error) {
          console.error('Error predicting species:', error);
          toast.error('Failed to predict species!');
        }
      })();
    }
  }, [imageUrl]);

  // initial load of existing trees
  useEffect(() => { fetchTrees(); }, []);

  const handleDataSubmit = async () => {
    const treeData = { species, location, date, treeName, climate, soilType, description, imageUrl };
    try {
      const response = await api1.post('/tree/uploadtree', treeData);
      toast.success('Data submitted successfully!');
      const { points } = response.data;
      const earnedpoints = points.earned;
      const co2 = points.earned / 100;
      toast.success(`Total Points Earned: ${earnedpoints}, Total CO₂ Sequestrated: ${co2} kg`);
  // reset form (optional)
  setSpecies(''); setLocation(null); setDate(''); setTreeName(''); setClimate(''); setSoilType(''); setDescription(''); setImageUrl(''); setImage(null); setImageName('');
  // refresh trees
  fetchTrees();
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to submit tree data!');
    }
  };

  return (
  <div className="mx-auto max-w-5xl space-y-10 rounded-2xl bg-white/90 p-6 text-black shadow backdrop-blur">
      <h1 className="text-center text-3xl font-bold">Upload the Initial Tree Sapling</h1>
      <div className="rounded-xl border border-dashed border-green-500 bg-green-50 p-5">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
          <div className="w-full md:flex-1">
            <label htmlFor="image-upload" className="mb-1 block text-sm font-medium text-green-800">Choose an Image</label>
            <input type="file" id="image-upload" accept="image/*" className="w-full cursor-pointer rounded-lg border border-green-300 bg-white px-4 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-green-700 focus:outline-none" onChange={(e) => { setImage(e.target.files[0]); setImageName(e.target.files[0]?.name || ''); }} />
            {imageName && <p className="mt-2 truncate text-xs text-green-700">Selected File: {imageName}</p>}
          </div>
          <button type="button" onClick={handleImageUpload} className="rounded-full bg-green-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400" disabled={!image}>Upload</button>
        </div>
        {imageUrl && (
          <div className="mt-5 overflow-hidden rounded-lg border border-green-200 bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Uploaded" className="mx-auto max-h-64 w-full object-contain" />
          </div>
        )}
      </div>
      {(species || location) && (
        <div className="grid gap-4 md:grid-cols-2">
          {species && (
            <div className="rounded-xl bg-emerald-600 p-4 text-white shadow">
              <p className="text-sm uppercase tracking-wide opacity-80">Predicted Species</p>
              <p className="mt-1 text-xl font-semibold">{species}</p>
              {!showPopover && (
                <button onClick={() => setShowPopover(true)} className="mt-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur hover:bg-white/30">Species Info</button>
              )}
            </div>
          )}
          {location && (
            <div className="rounded-xl bg-blue-600 p-4 text-white shadow">
              <p className="text-sm uppercase tracking-wide opacity-80">Location</p>
              <p className="mt-1 text-base">Lat {location.latitude.toFixed(4)}, Lng {location.longitude.toFixed(4)}</p>
            </div>
          )}
        </div>
      )}
      {showPopover && species && <Popover species={species} onClose={() => setShowPopover(false)} />}
  {location && species && (
        <div className="rounded-2xl bg-neutral-100 p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Tree Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1"><label htmlFor="date" className="text-sm font-medium">Date</label><input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300" /></div>
            <div className="space-y-1"><label htmlFor="tree-name" className="text-sm font-medium">Tree Name</label><input id="tree-name" type="text" value={treeName} onChange={(e) => setTreeName(e.target.value)} placeholder="Enter tree name" className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300" /></div>
            <div className="space-y-1"><label htmlFor="climate" className="text-sm font-medium">Climate</label><input id="climate" type="text" value={climate} onChange={(e) => setClimate(e.target.value)} placeholder="Climate" className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300" /></div>
            <div className="space-y-1"><label htmlFor="soil-type" className="text-sm font-medium">Soil Type</label><input id="soil-type" type="text" value={soilType} onChange={(e) => setSoilType(e.target.value)} placeholder="Soil type" className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300" /></div>
            <div className="space-y-1 md:col-span-2"><label htmlFor="description" className="text-sm font-medium">Description</label><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" className="h-28 w-full resize-none rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300" /></div>
          </div>
          <button onClick={handleDataSubmit} type="button" className="mt-5 w-full rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400">Submit</button>
        </div>
      )}

      {/* My Plants Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Plants</h2>
          <button onClick={fetchTrees} className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700">Refresh</button>
        </div>
        {loadingTrees ? (
          <div className="text-sm text-gray-600">Loading your trees...</div>
        ) : trees.length === 0 ? (
          <div className="rounded-lg border border-dashed border-green-300 bg-green-50 p-6 text-center text-sm text-gray-600">No trees uploaded yet. Upload your first sapling above!</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trees.map(t => {
              const loc = (() => { try { return t.location ? (typeof t.location === 'string' ? JSON.parse(t.location) : t.location) : null; } catch { return null; } })();
              return (
                <div key={t.id} className="group overflow-hidden rounded-xl border border-emerald-200 bg-white shadow hover:shadow-lg transition">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.imageurl} alt={t.treename} className="h-40 w-full object-cover transition group-hover:scale-[1.03]" />
                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-1 text-lg font-semibold text-emerald-700">{t.treename}</h3>
                    <p className="text-xs uppercase tracking-wide text-emerald-500">{t.species}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] font-medium">
                      {t.climate && <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">{t.climate}</span>}
                      {t.soiltype && <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">{t.soiltype}</span>}
                      {typeof t.co2_intake !== 'undefined' && <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">{t.co2_intake} kg CO₂</span>}
                    </div>
                    <div className="text-xs text-gray-600 flex flex-wrap gap-x-2">
                      {t.date && <span>📅 {t.date}</span>}
                      {loc && loc.latitude && <span>📍 {Number(loc.latitude).toFixed(2)},{' '}{Number(loc.longitude).toFixed(2)}</span>}
                    </div>
                    {t.description && <p className="line-clamp-3 text-xs text-gray-700">{t.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
