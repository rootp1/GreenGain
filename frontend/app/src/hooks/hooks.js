import { api2 } from "../services/api";

export const predictSpecies = async (imageUrl) => {
  try {
    const response = await api2.get("/predict", {
      params: { url: imageUrl },
    });

    console.log("Predicted species:", response.data);

    return response.data?.species || "Unknown";
  } catch (error) {
    console.error("Error predicting species:", error.response?.data || error.message);
    return "Prediction failed";
  }
};
