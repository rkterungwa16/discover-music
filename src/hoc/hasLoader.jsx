import React from 'react'

import { BeatLoader } from 'react-spinners'

import Header from '../components/Header'
import Footer from '../components/Footer'

const hasLoader= (WrappedComponent) => {
  const HasLoader = props => (
    <div className='container-wrapper'>
      <Header currentRoute={props.pageRoute} />
      <div className='container'>
        {
          !props.loading ?
          <div className='music__container'>
            <WrappedComponent {...props} />
          </div>
          :
          <div className='loader__container'>
            <BeatLoader
              sizeUnit={'rem'}
              size={2}
              color={'#ffffff'}
              loading={props.loading}
            /></div>
        }
        <Footer />
      </div>
    </div>
  )
  return HasLoader
}

export default hasLoader
