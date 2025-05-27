import { GoogleGenerativeAI } from "@google/generative-ai";
import supabase from "../model/userdb.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const calculateCarbonSequestration = async (species, age, climate, soil) => {
  const prompt = `
    Given the following tree characteristics:
    Tree Species: ${species}
    Age: ${age} 
    Climate: ${climate}
    Soil Type: ${soil}
    
    Estimate the carbon sequestration in kilograms per year for this tree. 
    Consider the average carbon sequestration rates for trees of this species and provide the result as an integer or decimal in kilograms. 
    don't give zero value and don't give NaN value, always return a decimal approximate value—even if it is just planted it will intake CO2.
    Return only the value in this format: value
    only the number decimal form, no brackets
    always return a value, not null
  `;

  const result = await model.generateContent(prompt);
  const resultText = result.response.text();

  const cleanResultText = resultText.replace(/```json|\n|```/g, "").trim();

  return cleanResultText;
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
