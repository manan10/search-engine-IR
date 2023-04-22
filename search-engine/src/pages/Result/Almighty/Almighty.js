import React, { useState } from 'react'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import List from './List/List';
import Pagination from './Pagination/Pagination';

function Almighty({ results, gotoTop, query, isLoading, error }) {
  const resultsPerPage = 10;
  const [resultOffset, setResultOffset] = useState(0);
  const endOffset = resultOffset + resultsPerPage;
  const currentResults = results.slice(resultOffset, endOffset);
  const pageCount = Math.ceil(results.length / resultsPerPage);
  
  const handlePageClick = (event) => {
      const newOffset = (event.selected * resultsPerPage) % results.length;
      setResultOffset(newOffset);
      gotoTop()
  };

  const content = (
    <>
      <p className='text-muted' style={{ fontSize: '14px'}}> {`Results for `} <b>{ query }</b></p>
      <p className='text-muted' style={{ marginTop: '-18px', fontSize: '14px' }}> {`${results.length} result(s).`} </p>
      <List currentResults={currentResults} error={ error } />
      <div style={{ marginTop: '40px' }}>
          <Pagination handlePageClick={ handlePageClick } pageCount={ pageCount } />
      </div>
    </>
  )

  return (
    <>
      {
        isLoading ? <LoadingSpinner /> : content
      }
    </>
  )  
}

export default Almighty