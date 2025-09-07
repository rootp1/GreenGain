import { GoogleGenerativeAI } from "@google/generative-ai";
import supabase from "../model/userdb.js";
import validator from "validator";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const calculateCarbonSequestration = async (species, age, climate, soil) => {
  const sanitizedSpecies = validator.escape(validator.trim(String(species))).substring(0, 100);
  const sanitizedAge = validator.escape(validator.trim(String(age))).substring(0, 50);
  const sanitizedClimate = validator.escape(validator.trim(String(climate))).substring(0, 50);
  const sanitizedSoil = validator.escape(validator.trim(String(soil))).substring(0, 50);
  if (!sanitizedSpecies || !sanitizedAge || !sanitizedClimate || !sanitizedSoil) {
    throw new Error("Invalid input parameters for carbon calculation");
  }
  const prompt = `Calculate carbon sequestration for the following tree parameters:
Species: "${sanitizedSpecies}"
Age: "${sanitizedAge}"
Climate: "${sanitizedClimate}"  
Soil: "${sanitizedSoil}"
Requirements:
- Return only a numeric value (integer or decimal)
- Value should be in kilograms per year
- Minimum value is 0.1, maximum value is 1000
- For newly planted trees, use values between 1-10 kg/year
- Do not include any text, explanations, or formatting
- Return only the number`;
  try {
    const result = await model.generateContent(prompt);
    const resultText = result.response.text();
    const cleanResultText = resultText.replace(/[^0-9.]/g, "").trim();
    const carbonValue = parseFloat(cleanResultText);
    if (isNaN(carbonValue) || carbonValue < 0.1 || carbonValue > 1000) {
      console.warn(`Invalid AI response for carbon calculation: ${cleanResultText}`);
      return age === "just planted" ? "2.5" : "15.0";
    }
    return carbonValue.toFixed(2);
  } catch (error) {
    console.error("Error in carbon sequestration calculation:", error);
    return age === "just planted" ? "2.5" : "15.0";
  }
};
export const calculatePlantAge = (plantedDate, latestPostDate) => {
  const startDate = new Date(plantedDate);
  const endDate = latestPostDate ? new Date(latestPostDate) : new Date();
  if (isNaN(startDate) || isNaN(endDate)) {
    throw new Error("Invalid date format. Please provide valid dates.");
  }
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += previousMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const yearText = years === 1 ? "year" : "years";
  const monthText = months === 1 ? "month" : "months";
  const dayText = days === 1 ? "day" : "days";
  return `${years} ${yearText}, ${months} ${monthText}, and ${days} ${dayText}`;
};
export const updatepoints = async (value, userId) => {
  try {
    if (!userId) {
      console.error("User not authenticated.");
      return { error: "User not authenticated." };
    }
    const { data, error } = await supabase
      .from("users")
      .select("points")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("Error fetching user points:", error);
      return { error: "Error fetching user points." };
    }
    const currentPoints = data?.points || 0;
    const newPoints = currentPoints + value * 100;
    const earned = value * 100;
    const { error: updateError } = await supabase
      .from("users")
      .update({ points: newPoints })
      .eq("id", userId);
    if (updateError) {
      console.error("Error updating points:", updateError);
      return { error: "Error updating points." };
    }
    return { earned };
  } catch (error) {
    console.error("Error updating points:", error);
    return { error: "Unexpected error occurred." };
  }
};
