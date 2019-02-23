import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import * as artistsActions from '../actions/artists'

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      artists: []
    }
  }

  componentDidMount () {
    this.props.artistsActions.getAllArtists()
  }

  render () {
    const {
      artists
    } = this.state

    return (
      <div className='container-wrapper'>
        <Header />
        <div className='container'>

        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artists: state.artists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    artistsActions: bindActionCreators(artistsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
