import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { BeatLoader } from 'react-spinners'

import Header from '../components/Header'
import Footer from '../components/Footer'
import GenreCard from '../components/GenreCard'
import * as userActions from '../actions/user'
import * as genresActions from '../actions/genres'

class Genres extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      genres: '',
      loading: false,
      currentRoute: ''
    }
  }

  componentDidMount () {
    let hashParams = {};

    this.setState({
      currentRoute: this.props.location.pathname.split('/')[1]
    });

	  let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = this.props.location.hash.substring(1);

    // eslint-disable-next-line
	  while ( e = r.exec(q)) {
	    hashParams[e[1]] = decodeURIComponent(e[2]);
    }
	  if(!hashParams.access_token) {
      window.location.href = `https://accounts.spotify.com/en/authorize?client_id=59dbbe0b726e402797a9bd8a8ce7b47b&response_type=token&redirect_uri=http:%2F%2Flocalhost:3000%2Fgenres%2Fcallback&scope=user-read-private%20user-library-read%20user-library-modify%20user-read-email%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state%20user-top-read%20user-read-recently-played`;
	  } else {
      this.props.userActions.getUser(hashParams.access_token);
      this.props.genresActions.getAllGenres({
        limit: 10
      }, hashParams.access_token)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.genres) {
      this.setState({
        genres: nextProps.genres,
        loading: false
      })
    }

    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading
      })
    }
  }

  renderGenres (genres) {
    if (genres) {

      const renderedGenre = JSON.parse(genres).categories.items.map((genre) => {
        return (
          <GenreCard
            iconUrl={genre.icons[0].url}
            id={genre.id}
            key={genre.id}
            name={genre.name}
          />
        )
      })

      return renderedGenre
    }
  }

  render () {
    const {
    loading,
    genres,
    currentRoute
    } = this.state
    return (
      <div className='container-wrapper'>
        <Header currentRoute={currentRoute} />
        <div className='container'>
          {!loading ?
            <div className='music__container'>
            {this.renderGenres(genres)}
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
    genres: state.genres.genres,
    loading: state.genres.isFetchingGenres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    userActions: bindActionCreators(userActions, dispatch),
    genresActions: bindActionCreators(genresActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres)
