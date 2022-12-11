import axios from "axios";

// const productURL = "https://hatlyback.herokuapp.com/api/";
const productURL = "https://hatly-server.onrender.com/api/";

export const fetchProduct = axios.create({
  baseURL: productURL,
});
