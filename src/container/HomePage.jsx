import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import MusicCard from '../components/MusicCard'
import * as artistsActions from '../actions/artists'
import * as userActions from '../actions/user'
import * as playlistActions from '../actions/playlist'

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      featuredPlaylist: ''
    }
  }

  componentDidMount () {
    let hashParams = {};
	  let e, r = /([^&;=]+)=?([^&;]*)/g,
	    q = this.props.location.hash.substring(1);
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
    }
	  if(!hashParams.access_token) {
      window.location.href = `https://accounts.spotify.com/en/authorize?client_id=59dbbe0b726e402797a9bd8a8ce7b47b&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09&response_type=token`;
	  } else {
      this.props.userActions.getUser(hashParams.access_token);
      this.props.playlistActions.getFeaturedPlaylists({
        limit: 12
      }, hashParams.access_token)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.featuredPlaylist) {
      this.setState({
        featuredPlaylist: nextProps.featuredPlaylist
      })
    }
  }

  renderFeaturedPlaylist (playlists) {
    console.log('playlist', playlists)
    if (playlists) {

      const renderedPlaylist = JSON.parse(playlists).playlists.items.map((playlist) => {
        return (
          <MusicCard
            imageUrl={playlist.images[0].url}
            key={playlist.id}
            name={playlist.name}
          />
        )
      })

      return renderedPlaylist
    }
  }

  render () {
    // if (this.state.featuredPlaylist) {
    //   console.log('render playlist', this.state.featuredPlaylist)
    // }
    return (
      <div className='container-wrapper'>
        <Header />
        <div className='container'>
          <div className='music__container'>
            {this.renderFeaturedPlaylist(this.state.featuredPlaylist)}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.authorize.token,
    featuredPlaylist: state.playlist.featuredPlaylists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    artistsActions: bindActionCreators(artistsActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    playlistActions: bindActionCreators(playlistActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
