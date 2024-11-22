import { countries } from "../../data/countries" 

export default function Form() {
  return (
    <form>

      <div>
        <label htmlFor="city">Ciudad:</label>
        <input 
          type="text" 
          id="city" 
          name="city"
          placeholder="Ciudad"
        />
      </div>
      
      <div>
        <label htmlFor="country">País:</label>
        <select name="country" id="country">
          <option value="">-- Seleccione --</option>
          {countries.map( country => (
            <option 
              key={country.code}
              value={country.code}
            >{country.name}</option>
          ))}
        </select>
      </div>

      <input type="submit" value="Consultar Clima" />
    </form>
  )
}
