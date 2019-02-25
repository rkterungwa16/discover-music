import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
          <Link
            to='/'
            className='header__link'
            style={{
              color: this.props.currentRoute === '' ? 'white' : ''
            }}
          >Featured</Link>
          <Link
            to='/new-releases'
            className='header__link'
            style={{
              color: this.props.currentRoute === 'new-releases' ? 'white' : ''
            }}
          >New Releases</Link>
          <Link
            to='/your-library'
            className='header__link'
            style={{
              color: this.props.currentRoute === 'your-library' ? 'white' : ''
            }}
          >Your library</Link>
          <Link
            to='/categories'
            style={{
              color: this.props.currentRoute === 'your-library' ? 'white' : ''
            }}
            className='header__link'
          >Categories</Link>
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
