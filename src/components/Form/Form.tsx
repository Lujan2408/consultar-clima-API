import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import { SearchType } from "../../types"
import Alert from "../Alert/Alert"

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>,
}

export default function Form({ fetchWeather } : FormProps) {

  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })
  const [alert, setAlert] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios')
      return
    }
    // When passing validation, we call the function
    fetchWeather(search)

  }

  return (
    <form 
      className={styles.form}
      onSubmit={handleSubmit}
      >

      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input 
          type="text" 
          id="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
    
      <div className={styles.field}>
        <label htmlFor="country">País</label>
        <select 
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un País --</option>
          {countries.map( country => (
            <option 
              key={country.code}
              value={country.code}
              >
              {country.name}
            </option>
          ))}
        </select>
      </div>
    
      <input className={styles.submit} type="submit" value="Consultar Clima" />
    
    </form>
  )
}
