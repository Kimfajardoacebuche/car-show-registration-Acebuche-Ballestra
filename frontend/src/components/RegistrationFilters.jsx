
function RegistrationFilters({
  filters,
  onFilterChange,
  onClear,
}) {
  return (
    <section className="filters-container">
      <div className="filter-group search-group">
        <label htmlFor="participant-search">
          Search Participant
        </label>

        <input
          id="participant-search"
          type="text"
          placeholder="Search participant name..."
          value={filters.participantName}
          onChange={(event) =>
            onFilterChange("participantName", event.target.value)
          }
        />
      </div>

      <div className="filter-group">
        <label htmlFor="registration-type">Registration Type</label>

        <select
          id="registration-type"
          value={filters.type}
          onChange={(event) =>
            onFilterChange("type", event.target.value)
          }
        >
          <option value="">All Types</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="registration-status">Status</label>

        <select
          id="registration-status"
          value={filters.status}
          onChange={(event) =>
            onFilterChange("status", event.target.value)
          }
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="button"
        className="clear-filter-button"
        onClick={onClear}
      >
        Clear Filters
      </button>
    </section>
  );
}

export default RegistrationFilters;
