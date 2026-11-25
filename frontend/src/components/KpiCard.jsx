export default function KpiCard({ title, value, subtitle, accentColor = "border-slate-200" }) {
  return (
    <div className={`bg-white rounded-xl border ${accentColor} p-5 shadow-sm`}>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
}
