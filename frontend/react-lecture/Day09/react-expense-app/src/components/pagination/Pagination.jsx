import './Pagination.css';

export default function Pagination({currentPage, pageSize, pagination, loading, onPageChange, itemLabel = '명'}) {
    
  const { totalElements, totalPages, hasNext, hasPrevious } = pagination;

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
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5; // 현재 페이지 주변에 표시할 페이지 수

    for (let i = 0; i < totalPages; i++) {
      // 첫 페이지, 마지막 페이지, 현재 페이지 주변만 표시
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - Math.floor(maxVisible / 2) &&
         i <= currentPage + Math.floor(maxVisible / 2))
      ) {
        pages.push(i);
      } else if (
        i === currentPage - Math.floor(maxVisible / 2) - 1 ||
        i === currentPage + Math.floor(maxVisible / 2) + 1
      ) {
        // 생략 표시
        pages.push(null);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min((currentPage + 1) * pageSize, totalElements);


  return (
    <div className="pagination">
      <div className="pagination-info">
        <span id="pageInfo">전체 {totalElements}{itemLabel} 중 {startIndex}-{endIndex}{itemLabel} 표시</span>
      </div>
      <div className="pagination-controls">
        <button 
          onClick={handlePreviousPage}
          id="prevBtn"
          className="pagination-btn" 
          aria-label="이전 페이지"
          disabled = {!hasPrevious || loading}
        >
          이전
        </button>
        <div className="pagination-pages">
          {visiblePages.map((page, index) => {
            if (page === null) {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                disabled={loading}
                className={`pagination-page-btn ${
                  page === currentPage ? 'active' : ''
                }`}
                aria-label={`${page + 1}페이지로 이동`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page + 1}
              </button>
            );
          })}
        </div>

        <button 
            onClick={handleNextPage}
          id="nextBtn"
          className="pagination-btn" 
          aria-label="다음 페이지"
          disabled={!hasNext || loading}
        >
          다음
        </button>
      </div>
    </div>
  );
}
