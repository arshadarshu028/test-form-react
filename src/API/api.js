import axios from "axios";
export const fetchOrders = (region) => {
  console.log(region);
  return axios.get(`https://restcountries.com/v3.1/region/${region}`);
};
