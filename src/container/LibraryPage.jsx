import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PulseLoader } from 'react-spinners'

import Header from '../components/Header'
import Footer from '../components/Footer'
import AlbumCard from '../components/AlbumCard'
import * as userActions from '../actions/user'
import * as albumActions from '../actions/userAlbum'
import * as trackActions from '../actions/userTracks'

class Library extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userAlbums: '',
      userTracks: '',
      loading: false,
      currentRoute: ''
    }
  }

  componentDidMount () {
    let hashParams = {};
	  let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = this.props.location.hash.substring(1);

    this.setState({
      currentRoute: this.props.location.pathname.split('/')[1]
    });

    // eslint-disable-next-line
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
    }
	  if(!hashParams.access_token) {
      window.location.href = `https://accounts.spotify.com/en/authorize?client_id=59dbbe0b726e402797a9bd8a8ce7b47b&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Flibrary%2Fcallback&scope=user-read-private%20user-library-read%20user-library-modify%20user-read-email%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state%20user-top-read%20user-read-recently-played`;
	  } else {
      this.props.userActions.getUser(hashParams.access_token);
      this.props.albumActions.getCurrentUserAlbums({
        limit: 10,
        aggregate_tracks: true,
        market: 'from_token'
      }, hashParams.access_token)

      this.props.trackActions.getCurrentUserTrack({
        limit: 10
      }, hashParams.access_token)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userAlbums && nextProps.userTracks) {
      this.setState({
        userAlbums: nextProps.userAlbums,
        userTracks: nextProps.userTracks,
        loading: false
      })
    }

    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading
      })
    }
  }

  renderUserAlbums (albums) {
    if (albums) {

      const renderedAlbum = JSON.parse(albums).items.map((album) => {
        return (
          <AlbumCard
            imageUrl={album.album.images[0].url}
            key={album.album.id}
            albumName={album.album.name}
            name={album.album.artists[0].name}
          />
        )
      })

      return renderedAlbum
    }
  }

  render () {
    const {
      loading,
      userAlbums,
      currentRoute
    } = this.state

    return (
      <div className='container-wrapper'>
        <Header currentRoute={currentRoute} />
        <div className='container'>
          {!loading ?
            <div className='albums__container'>
                <h1 className='album__header--text'>Favorite Albums</h1>
               <div className='music__container'>
                  { this.renderUserAlbums(userAlbums) }
                </div>
            </div>
            :
            <div className='loader__container'>
            <PulseLoader
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
    userAlbums: state.userAlbums.userAlbums,
    userTracks: state.userTracks.userTracks,
    loading: state.userAlbums.isFetchingUserAlbums
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    userActions: bindActionCreators(userActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch),
    trackActions: bindActionCreators(trackActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)
