import React from 'react'
import Home from './screens/Home'
import { Router, Routes,Route } from 'react-router-dom'
import Login from './screens/Login'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.jsx'
import { CartProvider } from './components/ContextReducer.jsx'

function App() {
  return (
    <CartProvider>
       <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
       </div>
    </CartProvider>
  )
}

export default App
