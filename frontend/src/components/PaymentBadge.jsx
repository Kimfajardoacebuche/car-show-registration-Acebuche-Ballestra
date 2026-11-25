export default function PaymentBadge({ status }) {
  const styles = {
    Unpaid: "bg-red-50 text-red-700 border-red-200",
    Partial: "bg-amber-50 text-amber-700 border-amber-200",
    Paid: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      {status}
    </span>
  );
}
