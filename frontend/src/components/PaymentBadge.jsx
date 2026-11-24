
function PaymentBadge({ status }) {
  const paymentClass = {
    Paid: "payment-paid",
    Partial: "payment-partial",
    Unpaid: "payment-unpaid",
  };

  return (
    <span className={`payment-badge ${paymentClass[status] || ""}`}>
      {status || "Unknown"}
    </span>
  );
}

export default PaymentBadge;
