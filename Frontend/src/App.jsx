import React from 'react'
import Login from './pages/Login'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import GetStarted from './pages/GetStarted.jsx'
import Dashboard from './pages/DashBoard.jsx'

const App = () => {
  return (
    <>
     <Routes>
         <Route path='/' element={<GetStarted/>}/>
      <Route path='/home' element={<Home/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>\
      <Route path='/register' element={<Register/>}/>
     </Routes>
    </>
  )
}

export default App
