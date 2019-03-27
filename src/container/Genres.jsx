import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import MusicListCollection from '../components/MusicListCollection'

import hasLoader from '../hoc/hasLoader'
import hasData from '../hoc/hasData'

import * as userActions from '../actions/user'
import * as genresActions from '../actions/genres'
import * as pageRouteActions from '../actions/pageRoute'

class Genres extends React.Component {
  render () {
    return (
      <React.Fragment>
        <MusicListCollection
          musicListCollection={this.props.genres}
          collectionType='categories'
          imageType='icons'
        />
      </React.Fragment>
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
    genresActions: bindActionCreators(genresActions, dispatch),
    pageRouteActions: bindActionCreators(pageRouteActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    hasData('genresActions', 'getAllGenres'),
    hasLoader
  )(Genres)
)
