import React, { Component } from 'react'
import logo from '../assets/logo.png'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }

    this.openHeaderTab = this.openHeaderTab.bind(this)
  }

  openHeaderTab () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
      <div className='header'>
        <div className='header__left'>
          <img
            className='header__logo'
            src={logo} alt='Auto1'
          />
        </div>
        <div
          className={!this.state.open ? 'header__center' : 'header__center responsive'}>
          <a href='#featured' className='header__link'>Featured</a>
          <a href='#genres' className='header__link'>Genres & Mode</a>
          <a href='#library' className='header__link'>Your library</a>
          <a href='#recently' className='header__link'>Recently played</a>
        </div>
        <div
          className='header__icon'
          onClick={this.openHeaderTab}
        >
          <i className='fa fa-bars fa-3x header-menu__icon' />
        </div>
      </div>
    )
  }
}

export default Header
