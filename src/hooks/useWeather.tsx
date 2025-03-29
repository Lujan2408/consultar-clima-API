import { z } from "zod"; 
import axios from "axios";
import { SearchType } from "../types";
import { useMemo, useState } from "react";

//Validación y tipado de la API con zod 
//Schema 
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})

// Extraer el type inferido  
export type Weather = z.infer<typeof Weather>

const INITIAL_STATE = {
  name: "",   
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}

export default function useWeather() {

  const [weather, setWeather] = useState<Weather>(INITIAL_STATE)
  const [loading, setLoading] = useState(false) // Spinner de carga
  const [found, setFound] = useState(false) // State para la ciudad encontrada 

  const fetchWeather = async (search : SearchType) => {

    const appId = import.meta.env.VITE_API_KEY

    setLoading(true)
    setWeather(INITIAL_STATE)
    
    try {
      
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
      
      // Destructuring para acceder directamente a data
      const {data} = await axios.get(geoUrl)
      
      // Validar si la ciudad no fue encontrada 
      if (!data[0]) {
        setFound(true)
        return
      }

      // Acceder a la longitud y latitud
      const lat = data[0].lat
      const lon = data[0].lon
      
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      const {data: weatherResult} = await axios.get(weatherUrl)
      const result = Weather.safeParse(weatherResult) // safeParse compara las propiedades del JSON con las del schema - retorna true/false
      
      if(result.success) {
        setWeather(result.data)
      } 
      
    } catch (error) {
      console.log(error)
    } finally { // El codigo que haya dentro de finally siempre se ejecutará incluso si el try/catch falla
      setLoading(false)
    }
  };

  // Validar si en weather.name hay algo
  const hasWeatherData = useMemo(() => weather.name ,[weather])

  return {
    weather, // State 
    loading,
    found,
    fetchWeather,
    hasWeatherData,
  };
}
