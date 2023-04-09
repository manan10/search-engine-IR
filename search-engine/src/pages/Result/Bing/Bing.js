import React from 'react'
import Iframe from '../../../components/Iframe/Iframe'

function Bing({ queryString }) {
    return (
        <Iframe 
            title='bing'
            id="bing" 
            src="https://www.bing.com/search?q="
            queryString={queryString} 
            width="100%"
            height="100%"></Iframe>
      )
}

export default Bing