import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';

import './Pagination.css'
import List from './List';


function Almighty({ results, gotoTop, query }) {
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

return (
  <>
      <p className='text-muted' style={{ fontSize: '14px'}}> {`Results for `} <b>{ query }</b></p>
      <p className='text-muted' style={{ marginTop: '-18px', fontSize: '14px' }}> {`${results.length} result(s).`} </p>
      <List currentResults={currentResults} />
      <div style={{ textAlign: 'center', marginTop: '70px' }}>
          <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              pageLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"} />
      </div>
  </>
)  
}

export default Almighty