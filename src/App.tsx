import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Product from './components/product/Product'
import Header from './components/header/Header'
import LogIn from './components/login/Login'
import { useState } from 'react'

function App() {
  const [isLogIn, setIsLogIn] = useState(false)

  return (
    <>
      <Router>
        <Header isLogIn={isLogIn} />
        <Routes>
          <Route path='/product' element={<Product />} />
          <Route path='/log-in' element={<LogIn setIsLogIn={setIsLogIn}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
