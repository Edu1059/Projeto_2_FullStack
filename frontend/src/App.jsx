import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../src/components/Home/Login/Login'
import Create from '../src/components/Home/Create/Create'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home/login/" element={<Login />} />
          <Route path="/home/create/" element={<Create />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
