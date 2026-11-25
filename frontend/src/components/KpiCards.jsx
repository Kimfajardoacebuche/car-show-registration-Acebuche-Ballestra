import KpiCard from "./KpiCard";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount || 0);

export default function KpiCards({ summary, loading }) {
  if (loading && !summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 h-24 animate-pulse">
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const data = summary || {
    totalRegistrations: 0,
    totalPayments: 0,
    uncollectedPayments: 0,
    confirmed: 0,
    checkedIn: 0,
    totalFees: 0,
  };

  const collectionRate =
    data.totalFees > 0 ? ((data.totalPayments / data.totalFees) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      <KpiCard
        title="Total Registrations"
        value={data.totalRegistrations}
        accentColor="border-l-4 border-l-slate-700 border-slate-200"
      />
      <KpiCard
        title="Total Payments"
        value={formatCurrency(data.totalPayments)}
        accentColor="border-l-4 border-l-emerald-600 border-slate-200"
      />
      <KpiCard
        title="Uncollected Payments"
        value={formatCurrency(data.uncollectedPayments)}
        accentColor="border-l-4 border-l-amber-500 border-slate-200"
      />
      <KpiCard
        title="Confirmed"
        value={data.confirmed}
        accentColor="border-l-4 border-l-blue-600 border-slate-200"
      />
      <KpiCard
        title="Checked In"
        value={data.checkedIn}
        accentColor="border-l-4 border-l-teal-600 border-slate-200"
      />
      <KpiCard
        title="Collection Rate"
        value={`${collectionRate}%`}
        subtitle={`of ${formatCurrency(data.totalFees)}`}
        accentColor="border-l-4 border-l-indigo-600 border-slate-200"
      />
    </div>
  );
}
