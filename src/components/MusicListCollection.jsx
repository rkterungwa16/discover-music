import React from 'react'

import MusicCard from './MusicCard'

const musicList = ({ musicListCollection, collectionType, imageType }) => {
  let renderedCollectionOfMusicList
  if (musicListCollection.length) {
    renderedCollectionOfMusicList = JSON.parse(musicListCollection)[collectionType].items.map((musicList) => {
      return (
        <MusicCard
          imageUrl={musicList[imageType][0].url}
          key={musicList.id}
          name={musicList.name}
        />
      )
    })
  } else {
    renderedCollectionOfMusicList = null
  }
  return (
    <React.Fragment>
      {renderedCollectionOfMusicList}
    </React.Fragment>
  )
}

export default musicList
