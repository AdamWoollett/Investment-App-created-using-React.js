import React from 'react'
import logo from '../assets/logo.jpg'
import HeaderTitle from './HeaderTitle.jsx'

const Header = () => {
  return (
    <header id="header">
      <img src={logo} alt="Investment Calculator Logo" />
      <HeaderTitle title={"Investment Calculator:"} subtitle={"Increase your finances!"}/>
    </header>
  )
}

export default Header
