const names = [
  "Juan Dela Cruz",
  "Maria Santos",
  "Pedro Reyes",
  "Ana Garcia",
  "Mark Villanueva",
  "John Mendoza",
  "Carlo Fernandez",
  "Sofia Ramirez",
  "Miguel Torres",
  "Angela Flores",
  "Daniel Cruz",
  "Nicole Bautista",
  "Gabriel Lopez",
  "Patricia Ramos",
  "Joshua Aquino",
  "Andrea Castillo",
  "Christian Rivera",
  "Bea Gonzales",
  "Francis Lim",
  "Kyla Martinez",
  "Rafael Diaz",
  "Trisha Navarro",
  "Kevin Morales",
  "Ella Dominguez",
  "Adrian Perez",
];

const types = ["Exhibitor", "Competitor", "VIP"];

const statuses = [
  "Pending",
  "Confirmed",
  "CheckedIn",
  "Cancelled",
];

const carModels = [
  "Toyota Supra",
  "Honda Civic",
  "Nissan Skyline",
  "Mitsubishi Lancer",
  "Mazda RX-7",
];

// Generate 25 sample registrations
export const sampleRegistrations = names.map((name, index) => {
  const registrationFee = 2500;

  const amountPaid = [0, 1000, 2500][index % 3];

  return {
    id: String(index + 1),

    registrationNumber: `CS27-${String(index + 1).padStart(4, "0")}`,

    registrationDate: new Date(
      2027,
      1,
      10 + index,
      8 + (index % 8),
      30
    ).toISOString(),

    participantName: name,

    contactNumber: `0917${String(index + 1).padStart(7, "0")}`,

    email: `participant${index + 1}@example.com`,

    address: "Sorsogon, Philippines",

    carMakeModel: carModels[index % carModels.length],

    plateNumber: `ABC ${String(index + 1).padStart(4, "0")}`,

    registrationType: types[index % types.length],

    status: statuses[index % statuses.length],

    registrationFee,

    amountPaid,

    paymentStatus:
      amountPaid === 0
        ? "Unpaid"
        : amountPaid < registrationFee
          ? "Partial"
          : "Paid",
  };
});

// Get registrations with search, filters, and pagination
export function getRegistrations(params = {}) {
  let data = [...sampleRegistrations];

  // Search participant name
  if (params.participantName) {
    data = data.filter((item) =>
      item.participantName
        .toLowerCase()
        .includes(params.participantName.toLowerCase())
    );
  }

  // Filter registration type
  if (params.type) {
    data = data.filter(
      (item) => item.registrationType === params.type
    );
  }

  // Filter registration status
  if (params.status) {
    data = data.filter(
      (item) => item.status === params.status
    );
  }

  // Pagination
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.pageSize) || 10);

  const totalCount = data.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const start = (page - 1) * pageSize;

  return {
    items: data.slice(start, start + pageSize),
    page,
    pageSize,
    totalCount,
    totalPages,
  };
}

// Get dashboard summary
export function getSummary() {
  const totalRegistrations = sampleRegistrations.length;

  const confirmed = sampleRegistrations.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const checkedIn = sampleRegistrations.filter(
    (item) => item.status === "CheckedIn"
  ).length;

  const pending = sampleRegistrations.filter(
    (item) => item.status === "Pending"
  ).length;

  const cancelled = sampleRegistrations.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const totalFees = sampleRegistrations.reduce(
    (sum, item) => sum + item.registrationFee,
    0
  );

  const totalPayments = sampleRegistrations.reduce(
    (sum, item) => sum + item.amountPaid,
    0
  );

  return {
    totalRegistrations,
    confirmed,
    checkedIn,
    pending,
    cancelled,
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  };
}