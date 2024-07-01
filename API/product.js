import axios from "axios";

const productURL = "https://hatly-backend.onrender.com/api/v1";
// const productURL = "http://localhost:8000/api/v1"; 
// const productURL = "https://hatlyapi.trendlix.com/api/"

export const fetchProduct = axios.create({
  baseURL: productURL,
});
