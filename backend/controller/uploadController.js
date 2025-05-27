import supabase from "../model/userdb.js";
import { calculateCarbonSequestration } from "./sequestration.js";
import { updatepoints } from "./sequestration.js";
export const uploadtree = async (req, res) => {
    console.log("UPLOADTREE HIT");
    console.log("req.user:", req.user);
    console.log("req.session:", req.session);
  
    const { species, location, date, treeName, climate, soilType, description, imageUrl } = req.body;
    const userId = req.user?.id;
  
    if (!userId) return res.status(401).json({ message: "User not authenticated" });
  
    try {
      if (!species || !location || !date || !treeName || !climate || !soilType || !description || !imageUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const co2String = await calculateCarbonSequestration(species, "just planted", climate, soilType);
      const co2 = parseFloat(co2String);
  
      const { data, error } = await supabase
        .from("tree")
        .insert([
          {
            userid: userId, // ✅ assuming your FK is `userid`
            species,
            treename: treeName,
            date,
            location: JSON.stringify(location),
            climate,
            soiltype: soilType,
            imageurl: imageUrl,
            description,
            co2_intake: co2,
          },
        ]);
  
      if (error) {
        console.error("Error inserting tree:", error);
        return res.status(500).json({ message: "Error uploading tree data" });
      }
  
      const epoints = await updatepoints(co2, userId);
      return res.status(200).json({ message: "Tree uploaded successfully", tree: data, points: epoints });
  
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
        .eq("userid", userId); // ✅ match the field used above
  
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
  