import axios from "axios";

// const productURL = "https://hatlyback.herokuapp.com/api/";
const productURL = "https://hatly-backend.onrender.com/api/v1";
// const productURL = "https://hatly-server.onrender.com/api/";
// const productURL = "https://hatlyapi.trendlix.com/api/"

export const fetchProduct = axios.create({
  baseURL: productURL,
});
