import { api2 } from "../services/api";

export const predictSpecies = async (imageUrl) => {
    const response = await api2.get("/predict", {
      params: { url: imageUrl },
    });
    console.log(response.data)
    return response.data;
  };