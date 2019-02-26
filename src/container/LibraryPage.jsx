import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PulseLoader } from 'react-spinners'

import Header from '../components/Header'
import Footer from '../components/Footer'
import AlbumCard from '../components/AlbumCard'
import * as authActions from '../actions/auth'
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
      currentRoute: '',
      albumLoading: false,
      albumDetails: '',
      albumOpen: false,
    }

    this.getAlbum = this.getAlbum.bind(this)
    this.closeAlbum = this.closeAlbum.bind(this)
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
      this.props.authActions.authorizeUserSuccess(hashParams.access_token)
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

    if (nextProps.albumLoading) {
      this.setState({
        albumLoading: nextProps.albumLoading
      })
    }

    if (nextProps.albumDetails) {
      this.setState({
        albumLoading: false,
        albumDetails: nextProps.albumDetails,
        albumOpen: true
      })
    }
  }

  getAlbum (id) {
    this.props.albumActions.getAlbum({
      limit: 10
    }, this.props.token, id)
  }

  closeAlbum () {
    this.setState({
      albumOpen: false
    })
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
            getAlbum={this.getAlbum}
            id={album.album.id}
          />
        )
      })
      return renderedAlbum
    }
  }

  renderAlbumTracks (album) {
    if (album) {
      const renderedTracks = JSON.parse(album).tracks.items.map((track) => {
        return (
          <li><i className='album-track__play--icon fas fa-play fa-1x'></i>{track.name}</li>
        )
      })
      return (
        <div className='album-details__container'>
          <div className='album-img__wrapper'>
            <img className='album__img' src={JSON.parse(album).images[0].url} alt='Album' />
          </div>
          <div className='alb-track__wrapper'><ul className='album__tracks'>
            { renderedTracks }
          </ul></div>
        </div>
      )
    }
  }

  render () {
    const {
      loading,
      userAlbums,
      albumOpen,
      albumDetails,
      currentRoute
    } = this.state

    return (
      <div className='container-wrapper'>
        <Header currentRoute={currentRoute} />
        <div className='container'>
          {!loading ?
            <div className='albums__container'>
              {
                !albumOpen?
                <Fragment>
                  <h1 className='album__header--text'>Favorite Albums</h1>
                  <div className='music__container'>
                    { this.renderUserAlbums(userAlbums) }
                  </div>
                </Fragment>
                :
                <Fragment>
                  <div className='album__header'>
                    <h1 className='album__header--text'>{JSON.parse(albumDetails).name}</h1>
                    <h4 className='artist__name'>{`(${JSON.parse(albumDetails).artists[0].name})`}</h4>
                    <div
                      className='close__btn'
                      onClick={this.closeAlbum}
                    ><i className='fas fa-times fa-5x'></i></div>
                  </div>
                  { this.renderAlbumTracks(albumDetails) }
                </Fragment>
              }
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
    loading: state.userAlbums.isFetchingUserAlbums,
    albumLoading: state.userAlbums.isFetchingAlbum,
    albumDetails: state.userAlbums.album
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    userActions: bindActionCreators(userActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch),
    trackActions: bindActionCreators(trackActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library)
