import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Другие роуты добавят коллеги */}
      </Routes>
    </BrowserRouter>
  )
}

export default App