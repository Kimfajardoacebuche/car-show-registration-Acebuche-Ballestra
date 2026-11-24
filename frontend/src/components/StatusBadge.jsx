
function StatusBadge({ status }) {
  const statusClass = {
    Pending: "status-pending",
    Confirmed: "status-confirmed",
    CheckedIn: "status-checked-in",
    Cancelled: "status-cancelled",
  };

  const displayStatus = {
    CheckedIn: "Checked In",
  };

  return (
    <span className={`status-badge ${statusClass[status] || ""}`}>
      {displayStatus[status] || status || "Unknown"}
    </span>
  );
}

export default StatusBadge;
