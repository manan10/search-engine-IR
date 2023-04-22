import React from 'react'

import classes from './List.module.css'

function List({ currentResults, error }) {
    return (
        <>
        {
            error && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                    <p className='text-muted'>{ error }</p>
                </div>
            )
        }
        { 
            currentResults && currentResults.map((result) => {
                return (
                    <div className={ classes.ResultItem } key={ result.id }>
                        <a href={ result.url } target="_blank" rel='noopener noreferrer' className={classes.Link}>
                            <h5> { result.title } </h5>
                            <p className='text-muted' style={{ marginTop: '-10px', fontSize: '15px' }}> {  result.url } </p>
                        </a>
                        <p style={{ marginTop: '-15px', fontSize: '14px' }}> { result.content } </p>
                        <hr />
                    </div>
                )
            })
        }
        {
            currentResults.length === 0 &&  (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                    <p className='text-muted'>No results found. Try again.</p>
                </div>
            )
        }
    </>
  )
}

export default List