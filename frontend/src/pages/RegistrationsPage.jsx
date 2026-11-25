import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
// Switch between "../api/sample-data" and "../api/registrationsApi" when backend is ready
import { getRegistrations, getSummary } from "../api/sample-data";
import KpiCards from "../components/KpiCards";
import RegistrationFilters from "../components/RegistrationFilters";
import RegistrationTable from "../components/RegistrationTable";
import Pagination from "../components/Pagination";

export default function RegistrationsPage() {
  // Filter & pagination state
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);

  // Debounce search input by 400ms
  const debouncedSearch = useDebounce(search, 400);

  // Data, loading, and error states
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [registrationsData, setRegistrationsData] = useState({
    items: [],
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch KPI summary
  useEffect(() => {
    let ignore = false;

    async function loadSummary() {
      setSummaryLoading(true);
      try {
        const result = await getSummary();
        if (!ignore) setSummary(result);
      } catch (err) {
        console.error("Failed to load summary:", err);
      } finally {
        if (!ignore) setSummaryLoading(false);
      }
    }

    loadSummary();
    return () => {
      ignore = true;
    };
  }, [refreshKey]);

  // Fetch paginated & filtered registrations
  useEffect(() => {
    let ignore = false;

    async function loadRegistrations() {
      setLoading(true);
      setError(null);
      try {
        const result = await getRegistrations({
          participantName: debouncedSearch,
          type,
          status,
          page,
          pageSize,
        });
        if (!ignore) setRegistrationsData(result);
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Unable to connect to the server.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadRegistrations();
    return () => {
      ignore = true;
    };
  }, [debouncedSearch, type, status, page, pageSize, refreshKey]);

  // Filter handlers (always reset page to 1)
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setType("All");
    setStatus("All");
    setPage(1);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleRetry = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
              CS
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Car Show 2027
              </h1>
              <p className="text-xs text-slate-500">
                AutoVista Events • Registration Dashboard
              </p>
            </div>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            Sorsogon City Coliseum
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPI Summary Cards */}
        <KpiCards summary={summary} loading={summaryLoading} />

        {/* Filters + Table + Pagination */}
        <section>
          <RegistrationFilters
            search={search}
            onSearchChange={handleSearchChange}
            type={type}
            onTypeChange={handleTypeChange}
            status={status}
            onStatusChange={handleStatusChange}
            onClear={handleClearFilters}
          />

          <RegistrationTable
            items={registrationsData.items}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            onClearFilters={handleClearFilters}
          />

          {!error && (
            <Pagination
              page={registrationsData.page}
              pageSize={registrationsData.pageSize}
              totalCount={registrationsData.totalCount}
              totalPages={registrationsData.totalPages}
              loading={loading}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </section>
      </main>
    </div>
  );
}
