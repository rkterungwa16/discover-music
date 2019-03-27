import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import MusicListCollection from '../components/MusicListCollection'

import hasLoader from '../hoc/hasLoader'
import hasData from '../hoc/hasData'

import * as userActions from '../actions/user'
import * as albumActions from '../actions/userAlbum'
import * as pageRouteActions from '../actions/pageRoute'

const NewAlbums = props => (
  <React.Fragment>
    <MusicListCollection
      musicListCollection={props.newAlbums}
      collectionType='albums'
      imageType='images'
    />
  </React.Fragment>
)

const mapStateToProps = state => {
  return {
    token: state.authorize.token,
    newAlbums: state.userAlbums.newAlbums,
    loading: state.userAlbums.isFetchingNewAlbums
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    userActions: bindActionCreators(userActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch),
    pageRouteActions: bindActionCreators(pageRouteActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    hasData('albumActions', 'getNewAlbums'),
    hasLoader
  )(NewAlbums)
)
