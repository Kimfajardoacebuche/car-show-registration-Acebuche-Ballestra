
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

function RegistrationTable({
  registrations = [],
  loading = false,
}) {
  if (loading) {
    return (
      <div className="table-message">
        Loading registrations...
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="table-message">
        <h3>No registrations found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="registration-table">
        <thead>
          <tr>
            <th>Registration No.</th>
            <th>Date</th>
            <th>Participant</th>
            <th>Contact</th>
            <th>Car Model</th>
            <th>Type</th>
            <th>Status</th>
            <th>Registration Fee</th>
            <th>Amount Paid</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td>{registration.registrationNumber}</td>
              <td>{formatDate(registration.registrationDate)}</td>
              <td>{registration.participantName}</td>
              <td>{registration.contactNumber}</td>
              <td>{registration.carMakeModel}</td>
              <td>{registration.registrationType}</td>
              <td>
                <StatusBadge status={registration.status} />
              </td>
              <td className="amount-cell">
                {formatCurrency(registration.registrationFee)}
              </td>
              <td className="amount-cell">
                {formatCurrency(registration.amountPaid)}
              </td>
              <td>
                <PaymentBadge status={registration.paymentStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegistrationTable;
