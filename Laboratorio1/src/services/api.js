import axios from "axios";

const API_URL = "http://wafi.iit.cnr.it/openervm/api/getPlaces";

export const getLugares = async (
  location = "Barcelona",
  category = "poi",
  keyword = "",
  source = "GooglePlaces"
) => {
  try {
    const response = await axios.get(
      `${API_URL}?location=${location}&category=${category}&keyword=${keyword}&source=${source}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener lugares:", error);
    return [];
  }
};
