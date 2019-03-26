import React from 'react'

import MusicCard from './MusicCard'

const Playlist = ({ featuredPlaylist }) => {
  let renderedPlaylist
  if (featuredPlaylist) {
    renderedPlaylist = JSON.parse(featuredPlaylist).playlists.items.map((playlist) => {
      return (
        <MusicCard
          imageUrl={playlist.images[0].url}
          key={playlist.id}
          name={playlist.name}
        />
      )
    })
  } else {
    renderedPlaylist = null
  }
  return (
    <React.Fragment>
      {renderedPlaylist}
    </React.Fragment>
  )
}

export default Playlist
