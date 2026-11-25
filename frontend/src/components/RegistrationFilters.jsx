export default function RegistrationFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  onClear,
}) {
  const hasActiveFilters = search.trim() !== "" || type !== "All" || status !== "All";

  return (
    <div className="bg-white rounded-t-xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h2 className="text-lg font-semibold text-slate-800">Registrations</h2>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search by participant name */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search participant name…"
            aria-label="Search participant name"
            className="w-full sm:w-64 pl-3 pr-8 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Type filter */}
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          aria-label="Filter by registration type"
          className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Types</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
          className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Clear / Reset button */}
        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="px-3.5 py-2 text-sm font-medium rounded-lg border border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
