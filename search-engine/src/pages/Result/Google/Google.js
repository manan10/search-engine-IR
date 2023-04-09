import React from 'react'
import Iframe from '../../../components/Iframe/Iframe'

function Google({ queryString }) {
  return (
    <Iframe 
        title='google'
        id="google" 
        src="https://www.google.com/search?igu=1&source=hp&ei=lheWXriYJ4PktQXN-LPgDA&q="
        queryString={queryString} 
        ></Iframe>
  )
}

export default Google