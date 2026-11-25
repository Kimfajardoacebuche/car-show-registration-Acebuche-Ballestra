import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount || 0);

const formatDate = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function RegistrationTable({
  items,
  loading,
  error,
  onRetry,
  onClearFilters,
}) {
  // Error State
  if (error) {
    return (
      <div className="bg-white border-x border-b border-slate-200 p-12 text-center">
        <p className="text-red-600 font-medium mb-1">Cannot reach the API</p>
        <p className="text-sm text-slate-500 mb-4">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  // Empty State (when not loading)
  if (!loading && items.length === 0) {
    return (
      <div className="bg-white border-x border-b border-slate-200 p-12 text-center">
        <p className="text-slate-700 font-medium mb-1">
          No registrations match your filters
        </p>
        <p className="text-sm text-slate-500 mb-4">
          Try adjusting your search query or resetting the dropdown filters.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-x border-b border-slate-200 overflow-x-auto">
      {loading && (
        <div className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-medium border-b border-blue-100">
          Loading registrations…
        </div>
      )}

      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left">Reg. No.</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Participant</th>
            <th className="px-4 py-3 text-left">Car</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Fee / Paid</th>
            <th className="px-4 py-3 text-left">Payment</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {loading
            ? [...Array(5)].map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="h-4 bg-slate-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-slate-200 rounded w-32"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-slate-200 rounded w-28 mb-1.5"></div>
                    <div className="h-3 bg-slate-100 rounded w-24"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-slate-200 rounded w-32 mb-1.5"></div>
                    <div className="h-3 bg-slate-100 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 bg-slate-200 rounded-full w-20"></div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="h-4 bg-slate-200 rounded w-28 ml-auto"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 bg-slate-200 rounded-full w-16"></div>
                  </td>
                </tr>
              ))
            : items.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-medium text-slate-900 whitespace-nowrap">
                    {reg.registrationNumber}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                    {formatDate(reg.registrationDate)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-slate-900">
                      {reg.participantName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {reg.contactNumber} • {reg.email}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-slate-900">{reg.carMakeModel}</div>
                    <div className="text-xs font-mono text-slate-500">
                      {reg.plateNumber}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                    {reg.registrationType}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={reg.status} />
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono whitespace-nowrap">
                    <span className="text-slate-600">
                      {formatCurrency(reg.registrationFee)}
                    </span>
                    <span className="text-slate-400"> / </span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(reg.amountPaid)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <PaymentBadge status={reg.paymentStatus} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
