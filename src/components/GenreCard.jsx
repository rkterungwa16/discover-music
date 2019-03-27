import React from 'react'

const GenreCard = props => (
  <div className='card'>
    <img className='card__img' src={props.iconUrl} alt='Avatar' />
    <div className='card-text__container'>
      <h4><b>{props.name}</b></h4>
  </div>
  </div>
)

export default GenreCard;
