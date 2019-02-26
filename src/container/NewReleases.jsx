import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PulseLoader } from 'react-spinners'

import Header from '../components/Header'
import Footer from '../components/Footer'
import MusicCard from '../components/MusicCard'
import * as userActions from '../actions/user'
import * as albumActions from '../actions/userAlbum'
import { CALLBACK_BASE_URL } from '../constants'

class NewAlbums extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newAlbums: '',
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
      window.location.href = `https://accounts.spotify.com/en/authorize?client_id=59dbbe0b726e402797a9bd8a8ce7b47b&response_type=token&redirect_uri=http:%2F%2F${CALLBACK_BASE_URL}%2Fnew-releases%2Fcallback&scope=user-read-private%20user-library-read%20user-library-modify%20user-read-email%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state%20user-top-read%20user-read-recently-played`;
	  } else {
      this.props.userActions.getUser(hashParams.access_token);
      this.props.albumActions.getNewAlbums({
        limit: 10
      }, hashParams.access_token)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newAlbums) {
      this.setState({
        newAlbums: nextProps.newAlbums,
        loading: false
      })
    }

    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading
      })
    }
  }

  renderNewAlbums (albums) {
    if (albums) {

      const renderedAlbum = JSON.parse(albums).albums.items.map((album) => {
        return (
          <MusicCard
            imageUrl={album.images[0].url}
            key={album.id}
            name={album.name}
          />
        )
      })

      return renderedAlbum
    }
  }

  render () {
    const {
      loading,
      newAlbums,
      currentRoute
    } = this.state

    return (
      <div className='container-wrapper'>
        <Header currentRoute={currentRoute} />
        <div className='container'>
          {!loading ?
            <div className='music__container'>
              { this.renderNewAlbums(newAlbums) }
            </div> :
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
    newAlbums: state.userAlbums.newAlbums,
    loading: state.userAlbums.isFetchingNewAlbums
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    userActions: bindActionCreators(userActions, dispatch),
    albumActions: bindActionCreators(albumActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbums)
