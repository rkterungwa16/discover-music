import React from 'react'
import { compose } from 'redux'

import { CALLBACK_BASE_URL, HTTP } from '../constants'

const isContainer = (data, CardComponent) => WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: '',
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
        window.location.href = `https://accounts.spotify.com/en/authorize?client_id=59dbbe0b726e402797a9bd8a8ce7b47b&response_type=token&redirect_uri=${HTTP}:%2F%2F${CALLBACK_BASE_URL}%2Fdata%2Fcallback&scope=user-read-private%20user-library-read%20user-library-modify%20user-read-email%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20playlist-read-collaborative%20user-modify-playback-state%20user-read-currently-playing%20user-read-playback-state%20user-top-read%20user-read-recently-played`;
      } else {
        this.props.userActions.getUser(hashParams.access_token);
        this.props.dataActions.getAlldata({
          limit: 10
        }, hashParams.access_token)
      }
    }

    renderComponentData (data) {
      if (data) {

        const renderedComponent = JSON.parse(data).categories.items.map((value) => {
          return (
            <CardComponent
              iconUrl={value.icons[0].url}
              id={value.id}
              key={value.id}
              name={value.name}
            />
          )
        })
        return renderedComponent
      }
    }
  }
}