import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import Treecard from "../components/treecard"; 
import TreeUploader from "../components/uploadtree";
import { api1 } from "../services/api";

export default function Tree() {
    const [showUploader, setShowUploader] = useState(false);
    const [trees, setTrees] = useState([]); 
    const { user, loading } = useContext(AuthContext); 

    useEffect(() => {
        if (loading || !user) return;

        const fetchTrees = async () => {
            try {
                const response = await api1.get("/tree/gettree");
                setTrees(response.data);
                console.log("Fetched trees:", response.data);
            } catch (error) {
                console.error("Error fetching trees:", error.message);
            }
        };

        fetchTrees();
    }, [user, loading]); 

    const handleAddClick = () => setShowUploader(true);
    const handleCloseUploader = () => setShowUploader(false);

    return (
                <div className="font-pixel px-6 py-4">
                    <div className="mb-6 flex items-center gap-6 text-4xl font-extrabold">
                        <span>My Plants</span>
                        <button onClick={handleAddClick} className="rounded-full bg-black px-6 py-2 text-2xl text-white shadow hover:bg-neutral-800">+ Add</button>
                    </div>

                    {showUploader && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="max-h-[80vh] w-11/12 max-w-xl overflow-y-auto rounded-xl border-4 border-black bg-white p-6">
                                <TreeUploader />
                                <button onClick={handleCloseUploader} className="mt-4 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Close</button>
                            </div>
                        </div>
                    )}

                    <div className="mx-auto w-full rounded-3xl border-4 border-black bg-white p-6">
                        <div className="mb-6 text-3xl">Your garden 🏡 | Chennai</div>
                        <div className="flex flex-wrap justify-around gap-8">
                            {trees.length > 0 ? (
                                trees.map((tree) => (
                                    <Treecard
                                        key={tree.tid}
                                        imageurl={tree.imageurl}
                                        treename={tree.treename}
                                        species={tree.species}
                                        date={new Date(tree.date).toLocaleDateString()}
                                        co2={tree.co2_intake}
                                    />
                                ))
                            ) : (
                                <p className="text-3xl">Plant Trees to reduce CO₂ and earn</p>
                            )}
                        </div>
                    </div>
                </div>
    );
}
