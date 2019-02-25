import React, { Component } from 'react'

class MusicCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paused: false
    }

    this.play = this.play.bind(this)
  }

  play () {
    this.setState({
      paused: !this.state.paused
    })
  }

  render () {
    return (
  <div className='card'>
    <img className='card__img' src={this.props.imageUrl} alt='Avatar' />
    <div className='card-text__container'>
      <h4><b>{this.props.name}</b></h4>

      <div
        className='play-btn__container'
        onClick={this.play}
      >{
        !this.state.paused ? <i className='play-btn__icon fas fa-play fa-3x'></i> :
        <i className='play-btn__icon fas fa-pause fa-3x'></i>
      }
      </div>
  </div>
  </div>
)
  }
}

export default MusicCard
