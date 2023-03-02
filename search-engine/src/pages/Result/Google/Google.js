import React from 'react'

function Google({ queryString }) {
  return (
    <iframe 
        title='google'
        id="google" 
        src={"https://www.google.com/search?igu=1&source=hp&ei=lheWXriYJ4PktQXN-LPgDA&q=" + queryString} 
        width="100%"
        height="100%"></iframe>
  )
}

export default Google