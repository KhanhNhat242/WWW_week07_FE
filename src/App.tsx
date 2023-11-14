import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Product from './components/product/Product'
import Header from './components/header/Header'
import LogIn from './components/login/LogIn'
import { useEffect, useState } from 'react'
import ProductManager from './components/productManager/ProductManager'
import AddProduct from './components/productManager/addProduct/AddProduct'
import EditProduct from './components/productManager/editProduct/EditProduct'
import axios from 'axios'
import { ProductImage, ProductPrice } from './interface/Interface'
import ShoppingCart from './components/shoppingCart/ShoppingCart'

function App() {
  const [isLogIn, setIsLogIn] = useState<boolean>(false)
  // const [products, setProducts] = useState<Productt[]>([])
  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [productPrices, setProductPrices] = useState<ProductPrice[]>([])

  const getData = async () => {
    // const res1 = await axios.get('http://localhost:8080/getAllProducts')
    const res2 = await axios.get('http://localhost:8080/getAllProductImage')
    const res3 = await axios.get('http://localhost:8080/getAllProductPrice')

    // setProducts(res1.data)
    setProductImages(res2.data)
    setProductPrices(res3.data)
  }

  useEffect(() => {
    getData()
  }, [])

  // console.log(productPrices)

  return (
    <>
      <Router>
        <Header isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
        <Routes>
          <Route path='/product' element={<Product productPrices={productPrices} productImages={productImages} />} />
          <Route path='/log-in' element={<LogIn setIsLogIn={setIsLogIn}/>} />
          <Route path='/product-manager' element={<ProductManager isLogIn={isLogIn} />} />
          <Route path='/product-manager/add-product' element={<AddProduct isLogIn={isLogIn} />}/>
          <Route path='/product-manager/edit-product' element={<EditProduct />}/>
          <Route path='/shopping-cart' element={<ShoppingCart />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
