import axios from "axios";
import { SearchType } from "../types";

export default function useWeather() {
  const fetchWeather = async (search : SearchType) => {

    const appId = '5fa47e6f005d29c26292d0468039f869';
    
    try {
      
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
      // Destructuring para acceder directamente a data
      const {data} = await axios.get(geoUrl)
      console.log(data)
    
    } catch (error) {
      console.log(error)
    }
  };

  return {
    fetchWeather,
  };
}
