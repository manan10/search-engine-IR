import React from 'react'


function Bing({ queryString }) {
    return (
        <iframe 
            title='google'
            id="google" 
            src={ "https://www.bing.com/search?q=" + queryString } 
            width="100%"
            height="100%"></iframe>
      )
}

export default Bing