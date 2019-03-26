import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import Playlists from '../components/Playlists'

import hasLoader from '../hoc/hasLoader'
import hasData from '../hoc/hasData'

import * as artistsActions from '../actions/artists'
import * as userActions from '../actions/user'
import * as playlistActions from '../actions/playlist'
import * as pageRouteActions from '../actions/pageRoute'

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Playlists {...this.props} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.authorize.token,
    featuredPlaylist: state.playlist.featuredPlaylists,
    loading: state.playlist.isFetchingFeaturedPlaylist,
    pageRoute: state.pageRoute.pageRoute
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    artistsActions: bindActionCreators(artistsActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    playlistActions: bindActionCreators(playlistActions, dispatch),
    pageRouteActions: bindActionCreators(pageRouteActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    hasData('playlistActions'),
    hasLoader
  )(HomePage)
)

