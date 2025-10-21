import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Pais from './Pais.jsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/paises" replace />} /> 
        <Route path="/paises" element={<App />} /> //Había un error pavo
        <Route path="/paises/:pais" element={<Pais />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
