"use client";
import { useState, useEffect } from 'react';
import { predictSpecies, api1 } from '../../../components/api';
import { toast } from 'react-toastify';
import Popover from '../../../components/Popover';
import { Button, Card, Loading } from '../../../components/ui';
import { TreeDetailsForm } from '../../../components/forms/FormComponents';
import { MESSAGES, IMAGES } from '../../../lib/constants';
import { handleApiError, generateSafeFilename, formatLocation, processImageFile } from '../../../lib/utils';

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
      toast.error(MESSAGES.ERROR_NO_IMAGE);
      return;
    }
    try {
      const { base64, compressedFile } = await processImageFile(image);
      const safeName = generateSafeFilename(image.name);
      
      // Create proper data URL format that backend expects
      const mimeType = compressedFile.type || 'image/jpeg';
      const dataUrl = `data:${mimeType};base64,${base64}`;
      
      const response = await api1.post('/upload', { 
        file: dataUrl, 
        fileName: safeName 
      });
      setImageUrl(response.data.url);
      toast.success(MESSAGES.SUCCESS_UPLOAD);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(handleApiError(error, MESSAGES.ERROR_UPLOAD));
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
    try {
      await api1.post('/tree', {
        treeName, species, climate, soilType, description, date,
        imageUrl, location: JSON.stringify(location)
      });
      toast.success(MESSAGES.SUCCESS_SUBMIT);
      // Reset form
      setTreeName(''); setClimate(''); setSoilType(''); setDescription('');
      setDate(''); setImageUrl(''); setImage(null); setImageName('');
      fetchTrees();
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error(handleApiError(error, MESSAGES.ERROR_SUBMIT));
    }
  };

  return (
    <Card variant="default" padding="large" className="mx-auto max-w-5xl space-y-10 bg-white/90 text-black backdrop-blur">
      <h1 className="text-center text-3xl font-bold">Upload the Initial Tree Sapling</h1>
      
      {/* Image Upload Section */}
      <Card variant="green" padding="medium" className="border-dashed border-green-500">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
          <div className="w-full md:flex-1">
            <label htmlFor="image-upload" className="mb-1 block text-sm font-medium text-green-800">
              Choose an Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="w-full cursor-pointer rounded-lg border border-green-300 bg-white px-4 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-green-700 focus:outline-none"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageName(e.target.files[0]?.name || '');
              }}
            />
            {imageName && (
              <p className="mt-2 truncate text-xs text-green-700">
                Selected File: {imageName}
              </p>
            )}
          </div>
          <Button 
            onClick={handleImageUpload} 
            disabled={!image}
            size="medium"
          >
            Upload
          </Button>
        </div>
        
        {imageUrl && (
          <Card padding="small" className="mt-5 overflow-hidden border-green-200">
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              className="mx-auto max-h-64 w-full object-contain" 
            />
          </Card>
        )}
      </Card>
      
      {/* Prediction & Location Section */}
      {(species || location) && (
        <div className="grid gap-4 md:grid-cols-2">
          {species && (
            <Card className="bg-emerald-600 text-white" padding="medium">
              <p className="text-sm uppercase tracking-wide opacity-80">Predicted Species</p>
              <p className="mt-1 text-xl font-semibold">{species}</p>
              {!showPopover && (
                <Button
                  onClick={() => setShowPopover(true)}
                  variant="secondary"
                  size="small"
                  className="mt-3 bg-white/20 text-white backdrop-blur hover:bg-white/30 border-none"
                >
                  Species Info
                </Button>
              )}
            </Card>
          )}
          {location && (
            <Card className="bg-blue-600 text-white" padding="medium">
              <p className="text-sm uppercase tracking-wide opacity-80">Location</p>
              <p className="mt-1 text-base">{formatLocation(location)}</p>
            </Card>
          )}
        </div>
      )}
      {showPopover && species && <Popover species={species} onClose={() => setShowPopover(false)} />}

      {/* Tree Details Form */}
      {location && species && (
        <Card variant="neutral" padding="large">
          <TreeDetailsForm
            date={date}
            setDate={setDate}
            treeName={treeName}
            setTreeName={setTreeName}
            climate={climate}
            setClimate={setClimate}
            soilType={soilType}
            setSoilType={setSoilType}
            description={description}
            setDescription={setDescription}
            onSubmit={handleDataSubmit}
          />
        </Card>
      )}

      {/* My Plants Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Plants</h2>
          <Button onClick={fetchTrees} size="small">
            Refresh
          </Button>
        </div>
        
        {loadingTrees ? (
          <Loading text="Loading your trees..." />
        ) : trees.length === 0 ? (
          <Card variant="green" padding="large" className="border-dashed border-green-300 text-center">
            <p className="text-sm text-gray-600">No trees uploaded yet. Upload your first sapling above!</p>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trees.map(t => {
              const loc = (() => { 
                try { 
                  return t.location ? (typeof t.location === 'string' ? JSON.parse(t.location) : t.location) : null; 
                } catch { 
                  return null; 
                } 
              })();
              
              return (
                <Card key={t.id} padding="none" className="group overflow-hidden border-emerald-200 hover:shadow-lg transition">
                  <img 
                    src={t.imageurl} 
                    alt={t.treename} 
                    className="h-40 w-full object-cover transition group-hover:scale-[1.03]" 
                  />
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
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
