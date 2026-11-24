
function Pagination({
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const start =
    totalCount === 0 ? 0 : (page - 1) * pageSize + 1;

  const end = Math.min(page * pageSize, totalCount);

  if (totalPages <= 1) {
    return (
      <div className="pagination-container">
        <p>
          Showing {start}–{end} of {totalCount} registrations
        </p>
      </div>
    );
  }

  return (
    <div className="pagination-container">
      <p>
        Showing {start}–{end} of {totalCount} registrations
      </p>

      <div className="pagination-buttons">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="current-page">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
