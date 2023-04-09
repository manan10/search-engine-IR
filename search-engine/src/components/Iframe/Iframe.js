import React from 'react'

function Iframe({title, id, src, queryString}) {
    return (
        <iframe 
            title={title}
            id={id} 
            src={ src + queryString } 
            width="100%"
            height="100%"
            referrerPolicy='no-referer'
            >
        </iframe>
    )
}
export default Iframe