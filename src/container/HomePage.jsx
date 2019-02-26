import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { BeatLoader } from 'react-spinners'

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
      featuredPlaylist: '',
      loading: false,
      currentRoute: ''
    }
  }

  componentDidMount () {
    let hashParams = {};

    this.setState({
      currentRoute: this.props.location.pathname.split('/')[0]
    });

	  let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = this.props.location.hash.substring(1);

    // eslint-disable-next-line
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
    }
	  if(!hashParams.access_token) {
      window.location.href = `https://accounts.spotify.com/en/authorize?client_id=59dbbe0b726e402797a9bd8a8ce7b47b&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-library-read%20user-library-modify%20user-read-email%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state%20user-top-read%20user-read-recently-played`;
	  } else {
      this.props.userActions.getUser(hashParams.access_token);
      this.props.playlistActions.getFeaturedPlaylists({
        limit: 10
      }, hashParams.access_token)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.featuredPlaylist) {
      this.setState({
        featuredPlaylist: nextProps.featuredPlaylist,
        loading: false
      })
    }

    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading
      })
    }
  }

  renderFeaturedPlaylist (playlists) {
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
    const {
    loading,
    featuredPlaylist,
    currentRoute
    } = this.state
    return (
      <div className='container-wrapper'>
        <Header currentRoute={currentRoute} />
        <div className='container'>
          {!loading ?
            <div className='music__container'>
            {this.renderFeaturedPlaylist(featuredPlaylist)}
          </div>:
            <div className='loader__container'>
            <BeatLoader
              sizeUnit={'rem'}
              size={2}
              color={'#ffffff'}
              loading={this.state.loading}
            /></div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.authorize.token,
    featuredPlaylist: state.playlist.featuredPlaylists,
    loading: state.playlist.isFetchingPlaylists
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
