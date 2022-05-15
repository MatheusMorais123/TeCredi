import React from "react"
import './style.css'
const PaginationComponent = ({pages,currentPage,setCurrentPage }) => {
    return (

        <div className="pagination">
            {Array.from(Array(pages), (item, index) => {
                return <button key={index} value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
            })}
        </div>
    )
}
export default PaginationComponent