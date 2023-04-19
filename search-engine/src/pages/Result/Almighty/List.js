import React from 'react'

import classes from './Almighty.module.css'

function List({ currentResults }) {
  return (
    <>
        { 
            currentResults && currentResults.map((result) => {
                return (
                    <div className={ classes.ResultItem } key={ result.id }>
                        <a href={ result.src } target="_blank" rel='noopener noreferrer' className={classes.Link}>
                            <h5> { result.name } </h5>
                            <p className='text-muted' style={{ marginTop: '-10px', fontSize: '15px' }}> {  result.src } </p>
                        </a>
                        <p style={{ marginTop: '-15px', fontSize: '14px' }}> { result.desc } </p>
                        <hr />
                    </div>
                )
            })
        }
    </>
  )
}

export default List