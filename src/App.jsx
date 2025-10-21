import { useNavigate } from "react-router-dom"
import "./App.css"

function App() {
  const navigate = useNavigate()

  function handleSubmit(event) { // Al enviar el formulario
    event.preventDefault()
    const nombre = event.target.nombre.value.trim()

    if (!nombre) return alert("Por favor, escribí un país.")

    // Navegamos a la ruta dinámica
    navigate(`/paises/${encodeURIComponent(nombre.toLowerCase())}`)
  }

  return (
    <div className="App">
      <h1>Buscador de Países </h1>
      <h2>Escribí el nombre del país </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Argentina"
          autoComplete="off"
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}

export default App
