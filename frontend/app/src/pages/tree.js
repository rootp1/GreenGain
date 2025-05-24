import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Treecard from "../components/treecard"; 
import TreeUploader from "../components/uploadtree";
import { api1 } from "../services/api";

export default function Tree() {
    const [showUploader, setShowUploader] = useState(false);
    const [trees, setTrees] = useState([]); 
    const { user } = useContext(AuthContext); 

    
    useEffect(() => {
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
    }, [user.token]); 

    const handleAddClick = () => {
        setShowUploader(true);
    };

    const handleCloseUploader = () => {
        setShowUploader(false);
    };

    return (
        <div>
            <div className="plantadd">
                <div>Myplants</div>
                <div onClick={handleAddClick} className="plantaddbutton">
                    +Add
                </div>
            </div>

            {showUploader && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <TreeUploader />
                        <button className="close-button" onClick={handleCloseUploader}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="outercon">
                <div className="innercon">
                    <div className="garden">Your garden🏡 | Chennai</div>
                    <div className="treecon">
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
                            <p style={{fontSize:"40px"}}>Plant Trees to reduce co2 and earn</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}