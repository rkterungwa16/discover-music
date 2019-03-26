import React from 'react'

import { CALLBACK_BASE_URL, HTTP } from '../constants'

const hasData = (pageAction) => WrappedComponent => {
  return class extends React.Component {
    componentDidMount () {
      let hashParams = {};

      this.props.pageRouteActions.setCurrentRoute(this.props.location.pathname.split('/')[0])

      let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = this.props.location.hash.substring(1);

      // eslint-disable-next-line
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      if(!hashParams.access_token) {
        window.location.href = `https://accounts.spotify.com/en/authorize?client_id=59dbbe0b726e402797a9bd8a8ce7b47b&response_type=token&redirect_uri=${HTTP}:%2F%2F${CALLBACK_BASE_URL}%2Fcallback&scope=user-read-private%20user-library-read%20user-library-modify%20user-read-email%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state%20user-top-read%20user-read-recently-played`;
      } else {
        this.props.userActions.getUser(hashParams.access_token);
        this.props[pageAction].getFeaturedPlaylists({
          limit: 10
        }, hashParams.access_token)
      }
    }

    render() {
      return (<WrappedComponent {...this.props} />)
    }
  }
}

export default hasData
