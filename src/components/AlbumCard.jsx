import React from 'react'

const AlbumCard = props => {
  return (
    <div
      className='card'
      onClick={() => props.getAlbum(props.id)}
    >
      <img className='card__img' src={props.imageUrl} alt='Avatar' />
      <div className='card-text__container'>
        <h4><b>{props.albumName}</b></h4>
        <h4><b>{props.name}</b></h4>
      </div>
    </div>
  )
}

export default AlbumCard;
