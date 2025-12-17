import './Pagination.css'

export default function Pagination(
  currentPage,
  pageSize,
  pagination,
  loading,
  onPageChange,
  itemLabel = '명'
){
  const {totalElements, totalPages, hasNext, hasPrevious} = pagination;

  if (totalPages <= 1){
    return null;
  }

  function handlePreviousPage(){
    if(hasPrevious && !loading){
      onPageChange(currentPage -1);
    }
  }

  function handleNextPage(){
    if(hasNext && !loading){
      onPageChange(currentPage +1);
    }
  }

  function handlePageClick(page){
    if(!loading && page !== currentPage){
      onPageChange(page);
    }
  }

  // 표시할 페이지 번호 계산

  return(
    <div className='pagination'>
      <div className='pagination-info'>
        <span id="pageInfo">전체 {totalElements}{itemLabel} 중 1-10건 표시</span>
      </div>
      <div className='pagination-controls'>
        <button
          onClick={handlePreviousPage}
          id="prevBtn"
          className='pagination-btn'
          arid-label="이전 페이지"
          disabled
        >
          이전
        </button>

        <div 
          onClick={handlePageClick({page})} 
          className='pagination-pages' 
          id='pageNumbers'
        ></div>

        <button
          onClick={handleNextPage}
          id="nextBtn"
          className='pagination-btn'
          arid-label="ekdma 페이지"
          disabled
        >
          다음
        </button>
      </div>
    </div>
  );
};