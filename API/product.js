import axios from "axios";

// const productURL = "https://hatlyback.herokuapp.com/api/";
// const productURL = "http://localhost:8000/api/";
const productURL = "https://nice-pink-wasp-sock.cyclic.app/api/";

export const fetchProduct = axios.create({
  baseURL: productURL,
});
