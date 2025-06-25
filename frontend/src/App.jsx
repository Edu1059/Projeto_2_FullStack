import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../src/components/Home/Login/Login'
import Create from '../src/components/Home/Create/Create'
import Initial from './components/Home/Initial/Initial'
import PostNaruto from './components/Naruto/PostNaruto'
import GetNaruto from './components/Naruto/GetNaruto'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Initial />} />
          <Route path="/home/login/" element={<Login />} />
          <Route path="/home/create/" element={<Create />} />
          <Route path="/naruto/create/" element={<PostNaruto />} />
          <Route path="/naruto/data/:name" element={<GetNaruto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
