
function KpiCard({ title, value, description, icon }) {
  return (
    <div className="kpi-card">
      <div className="kpi-card-top">
        <span className="kpi-title">{title}</span>
        <span className="kpi-icon">{icon}</span>
      </div>

      <h2 className="kpi-value">{value}</h2>

      {description && (
        <p className="kpi-description">{description}</p>
      )}
    </div>
  );
}

export default KpiCard;
