import supabase from "../model/userdb.js";
import { calculateCarbonSequestration } from "./sequestration.js";
import { updatepoints } from "./sequestration.js";
import validator from "validator";
export const uploadtree = async (req, res) => {
    const { species, location, date, treeName, climate, soilType, description, imageUrl } = req.body;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "User not authenticated" });
    try {
      if (!species || !location || !date || !treeName || !climate || !soilType || !description || !imageUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      let parsedLocation;
      try {
        parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
        if (!parsedLocation.latitude || !parsedLocation.longitude) {
          throw new Error('Missing coordinates');
        }
      } catch (e) {
        return res.status(400).json({ message: "Invalid location data" });
      }
      const co2String = await calculateCarbonSequestration(species, "just planted", climate, soilType);
      const co2 = parseFloat(co2String);
      if (isNaN(co2) || co2 < 0) {
        return res.status(400).json({ message: "Invalid carbon sequestration calculation" });
      }
      const { data, error } = await supabase
        .from("tree")
        .insert([
          {
            userid: userId,
            species: validator.escape(species),
            treename: validator.escape(treeName),
            date,
            location: JSON.stringify(parsedLocation),
            climate: validator.escape(climate),
            soiltype: validator.escape(soilType),
            imageurl: imageUrl,
            description: validator.escape(description),
            co2_intake: co2,
          },
        ]);
      if (error) {
        console.error("Error inserting tree:", error);
        return res.status(500).json({ message: "Error uploading tree data" });
      }
      const epoints = await updatepoints(co2, userId);
      return res.status(200).json({ 
        message: "Tree uploaded successfully", 
        tree: data, 
        points: epoints 
      });
    } catch (error) {
      console.error("Error uploading tree:", error);
      return res.status(500).json({ message: "Error uploading tree data" });
    }
};
  export const gettree = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });
    try {
      const { data, error } = await supabase
        .from("tree")
        .select("*")
        .eq("userid", userId); 
      if (error) {
        console.error("Error fetching tree data:", error);
        return res.status(500).json({ error: "Failed to fetch tree data" });
      }
      return res.status(200).json(data);
    } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).json({ error: "Unexpected server error" });
    }
  };
