import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function Pais() {
    const { pais } = useParams()              // Lee el valor dinámico de la URL (/paises/:pais)
    const navigate = useNavigate()            // Para volver o navegar a otra ruta

    const [data, setData] = useState(null)    // Datos del país
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!pais) return                      // seguridad por si el parámetro no existe
        setLoading(true)
        setError(null)
        console.log("Valor de :pais →", pais)

        fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(pais)}?fullText=true`)
            .then(res => {
                if (!res.ok) throw new Error("País no encontrado")
                return res.json()
            })
            .then(data => {
                const p = data[0]
                setData({ // mapeamos los datos que nos interesan
                    nombre: p.translations?.spa?.common || p.name.common,
                    capital: p.capital?.[0] || "Sin capital",
                    region: p.region,
                    poblacion: p.population.toLocaleString(),
                    bandera: p.flags.svg,
                    moneda: Object.values(p.currencies || {})
                        .map(m => `${m.name} (${m.symbol})`)
                        .join(", "),
                    idiomas: Object.values(p.languages || {}).join(", ")
                })
            })
            .catch(() => setError("No se encontró el país."))
            .finally(() => setLoading(false))
    }, [pais]) // vuelve a ejecutar si cambia el parámetro en la URL

    // --- Renderizado ---
    if (loading) return <p>Cargando información...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <div style={{ textAlign: "center" }}> // centramos el contenido
            {data && (
                <>
                    <h2>{data.nombre}</h2>
                    <img
                        src={data.bandera}
                        alt={`Bandera de ${data.nombre}`}
                        width={200}
                    />
                    <p><strong>Capital:</strong> {data.capital}</p>
                    <p><strong>Región:</strong> {data.region}</p>
                    <p><strong>Población:</strong> {data.poblacion}</p>
                    <p><strong>Moneda:</strong> {data.moneda}</p>
                    <p><strong>Idiomas:</strong> {data.idiomas}</p>
                </>
            )}

            <button onClick={() => navigate("/paises")}>Volver</button> // Navega de vuelta a la lista de países
        </div>
    )
}

export default Pais
