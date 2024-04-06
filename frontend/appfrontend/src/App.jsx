import { useEffect, useState ,useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { connect } from 'mongoose'
import { RecoilRoot } from 'recoil'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Mainpage } from './components/mainpage'
import { Messaginbox } from './components/messagebox'

function App(){
  return ( <RecoilRoot>
    <MainApp />
  </RecoilRoot>
  )
}

function MainApp() {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/messagebox" element={<Messaginbox />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App