import Form from './components/Form/Form' 
import styles from './App.module.css'

function App() {

  return (
    <>
      <h1 className={styles.title}>Clima</h1>

      <div className={styles.container}>
        <Form />
        <p>2</p>
      </div>
    </>
  )
}

export default App
