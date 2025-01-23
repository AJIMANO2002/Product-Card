import React, { useState } from 'react'

function Paginations({ limit = 10, setLimit, totalCount = 0, currentPage = 1, setCurrentPage }) {

    let pageNumberLimit = 3;
    let [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    let [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);


    let pages = [];
    for (let i = 1; i <= Math.ceil(totalCount / limit); i++) {
        pages.push(i);
    }

    const handlePre = () => {
        setCurrentPage(currentPage - 1)
        if (currentPage - 1 === minPageNumberLimit) {
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        }
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        }
    }

    let pageDecrementBtn = null;
    let pageIncrementBtn = null;

    if (minPageNumberLimit !== 0) {
        pageDecrementBtn = <li><button onClick={handlePre} >&hellip;</button></li>
    }

    if (pages.lenth > maxPageNumberLimit) {
        pageIncrementBtn = <li><button onClick={handleNext}>&hellip;</button></li>
    }

    let start = (currentPage - 1) * limit + 1;
    let end = totalCount < currentPage * limit ? totalCount : currentPage * limit;

    

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return <li key={number} onClick={() => { setCurrentPage(Number(number)) }} className={number === currentPage  ? 'active' : ''}>
                <button>{number}</button>
            </li>
        }
    });




    return <div className='pagination-wrapper'>

        <div className='Entries'>
            <label > Show</label>
            &nbsp;
            <select className='pagination-select' defaultValue={limit} onChange={(e) => { setLimit(e.target.value); setCurrentPage(1) }}>

                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100 ">100</option>
            </select>
            &nbsp;
            <label > Entries</label>
        </div>
        <div className='Entries'>Showing {start} to {end} of {totalCount}</div>

        <div className='pagination-buttons'>
            <ul>
                <li><button onClick={() => { handlePre() }} disabled={currentPage === 1}>Pre</button></li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li><button onClick={() => { handleNext() }} disabled={currentPage === pages.length}>Next</button></li>

            </ul>
        </div>
    </div >
}

export default Paginations