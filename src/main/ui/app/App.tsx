import React from 'react'

import { Pages } from '../pages/Pages'
import { Header } from '../parts/Header'
import './App.css'

export const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="wrapper">
        <Pages />
      </div>
    </div>
  )
}
