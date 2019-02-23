import React from 'react'
import logo from '../assets/logo.png'

const Header = (props) => (
  <div className='header'>
    <div className='header__left'>
      <img
        className='header__logo'
        src={logo} alt='Auto1'
      />
    </div>
    <div className='header__right'>
      <a href='#purchase' className='header__link'>Purchase</a>
      <a href='#myOrders' className='header__link'>My Orders</a>
      <a href='#Sell' className='header__link'>Sell</a>
      <a href='#icon' className='header__icon'>
        <i className='fa fa-bars' />
      </a>
    </div>
  </div>
)

export default Header
