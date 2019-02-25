import React from 'react'
import logo from '../assets/background.png'

const MusicCard = (props) => (
  <div className='card'>
  <img className='card__img' src={props.imageUrl} alt='Avatar' />
  <div className='card-text__container'>
    <h4><b>{props.name}</b></h4>

    <div className='play-btn__container'><i className='play-btn__icon fas fa-play fa-3x'></i></div>
  </div>
</div>
)

export default MusicCard
