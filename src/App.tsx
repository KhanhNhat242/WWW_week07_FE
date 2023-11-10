import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Product from './components/product/Product'
import Header from './components/header/Header'
import LogIn from './components/login/LogIn'
import { useState } from 'react'
import ProductManager from './components/productManager/ProductManager'
import AddProduct from './components/productManager/addProduct/AddProduct'
import EditProduct from './components/productManager/editProduct/EditProduct'

function App() {
  const [isLogIn, setIsLogIn] = useState(false)

  return (
    <>
      <Router>
        <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
        <Routes>
          <Route path='/product' element={<Product />} />
          <Route path='/log-in' element={<LogIn setIsLogIn={setIsLogIn}/>} />
          <Route path='/product-manager' element={<ProductManager isLogIn={isLogIn} />} />
          <Route path='/product-manager/add-product' element={<AddProduct />}/>
          <Route path='/product-manager/edit-product' element={<EditProduct />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
