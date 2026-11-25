const SAMPLE_REGISTRATIONS = [
  {
    id: "3f2c9a1e-0001-4b8a-9c1d-100000000001",
    registrationNumber: "CS27-0001",
    registrationDate: "2027-02-10T08:30:00Z",
    participantName: "Juan Dela Cruz",
    contactNumber: "09171234567",
    email: "juan.delacruz@example.com",
    address: "123 Rizal St., Sorsogon City",
    carMakeModel: "Toyota Supra MK4",
    plateNumber: "ABC 1234",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 1000.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0002-4b8a-9c1d-100000000002",
    registrationNumber: "CS27-0002",
    registrationDate: "2027-02-10T09:15:00Z",
    participantName: "Maria Santos",
    contactNumber: "09182345678",
    email: "maria.santos@example.com",
    address: "45 Magsaysay Ave., Naga City",
    carMakeModel: "Honda Civic Type R FK8",
    plateNumber: "DEF 5678",
    registrationType: "VIP",
    status: "CheckedIn",
    registrationFee: 5000.00,
    amountPaid: 5000.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0003-4b8a-9c1d-100000000003",
    registrationNumber: "CS27-0003",
    registrationDate: "2027-02-10T10:05:00Z",
    participantName: "Carlo Mendoza",
    contactNumber: "09193456789",
    email: "carlo.m@example.com",
    address: "78 Penafrancia Ave., Legazpi City",
    carMakeModel: "Nissan GT-R R35",
    plateNumber: "GHI 9012",
    registrationType: "VIP",
    status: "Confirmed",
    registrationFee: 5000.00,
    amountPaid: 2500.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0004-4b8a-9c1d-100000000004",
    registrationNumber: "CS27-0004",
    registrationDate: "2027-02-10T11:20:00Z",
    participantName: "Ana Reyes",
    contactNumber: "09204567890",
    email: "ana.reyes@example.com",
    address: "12 Bonifacio St., Sorsogon City",
    carMakeModel: "Mazda RX-7 FD",
    plateNumber: "JKL 3456",
    registrationType: "Exhibitor",
    status: "Pending",
    registrationFee: 1500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0005-4b8a-9c1d-100000000005",
    registrationNumber: "CS27-0005",
    registrationDate: "2027-02-11T08:45:00Z",
    participantName: "Mark Villanueva",
    contactNumber: "09215678901",
    email: "mark.v@example.com",
    address: "89 Burgos St., Bulan, Sorsogon",
    carMakeModel: "Mitsubishi Lancer Evo IX",
    plateNumber: "MNO 7890",
    registrationType: "Competitor",
    status: "CheckedIn",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0006-4b8a-9c1d-100000000006",
    registrationNumber: "CS27-0006",
    registrationDate: "2027-02-11T09:30:00Z",
    participantName: "Rafael Bautista",
    contactNumber: "09226789012",
    email: "raf.bautista@example.com",
    address: "34 Quezon Blvd., Gubat, Sorsogon",
    carMakeModel: "Subaru WRX STI",
    plateNumber: "PQR 1122",
    registrationType: "Competitor",
    status: "Cancelled",
    registrationFee: 2500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0007-4b8a-9c1d-100000000007",
    registrationNumber: "CS27-0007",
    registrationDate: "2027-02-11T13:10:00Z",
    participantName: "Kristine Lim",
    contactNumber: "09237890123",
    email: "kristine.lim@example.com",
    address: "56 Mabini St., Legazpi City",
    carMakeModel: "BMW M3 Competition",
    plateNumber: "STU 3344",
    registrationType: "VIP",
    status: "CheckedIn",
    registrationFee: 5000.00,
    amountPaid: 5000.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0008-4b8a-9c1d-100000000008",
    registrationNumber: "CS27-0008",
    registrationDate: "2027-02-11T14:50:00Z",
    participantName: "Paolo Navarro",
    contactNumber: "09248901234",
    email: "paolo.nav@example.com",
    address: "90 Luna St., Irosin, Sorsogon",
    carMakeModel: "Toyota GR86",
    plateNumber: "VWX 5566",
    registrationType: "Exhibitor",
    status: "Confirmed",
    registrationFee: 1500.00,
    amountPaid: 1500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0009-4b8a-9c1d-100000000009",
    registrationNumber: "CS27-0009",
    registrationDate: "2027-02-12T08:00:00Z",
    participantName: "Dennis Aquino",
    contactNumber: "09259012345",
    email: "dennis.aquino@example.com",
    address: "21 Del Pilar St., Sorsogon City",
    carMakeModel: "Ford Mustang GT 5.0",
    plateNumber: "YZA 7788",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 1500.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0010-4b8a-9c1d-100000000010",
    registrationNumber: "CS27-0010",
    registrationDate: "2027-02-12T09:40:00Z",
    participantName: "Camille Tan",
    contactNumber: "09260123456",
    email: "camille.tan@example.com",
    address: "67 Zamora St., Naga City",
    carMakeModel: "Porsche 911 Carrera",
    plateNumber: "BCB 9900",
    registrationType: "VIP",
    status: "Confirmed",
    registrationFee: 5000.00,
    amountPaid: 5000.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0011-4b8a-9c1d-100000000011",
    registrationNumber: "CS27-0011",
    registrationDate: "2027-02-12T10:25:00Z",
    participantName: "Jerome Castillo",
    contactNumber: "09271234567",
    email: "jerome.c@example.com",
    address: "14 Aguinaldo St., Pilar, Sorsogon",
    carMakeModel: "Honda S2000",
    plateNumber: "CDC 1212",
    registrationType: "Exhibitor",
    status: "Pending",
    registrationFee: 1500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0012-4b8a-9c1d-100000000012",
    registrationNumber: "CS27-0012",
    registrationDate: "2027-02-12T11:55:00Z",
    participantName: "Bianca Torres",
    contactNumber: "09282345678",
    email: "bianca.torres@example.com",
    address: "88 Jacinto St., Sorsogon City",
    carMakeModel: "Audi RS3",
    plateNumber: "DED 3434",
    registrationType: "Competitor",
    status: "CheckedIn",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0013-4b8a-9c1d-100000000013",
    registrationNumber: "CS27-0013",
    registrationDate: "2027-02-12T14:15:00Z",
    participantName: "Gabriel Ramos",
    contactNumber: "09293456789",
    email: "gab.ramos@example.com",
    address: "55 Gomez St., Casiguran, Sorsogon",
    carMakeModel: "Toyota Corolla AE86",
    plateNumber: "EFE 5656",
    registrationType: "Exhibitor",
    status: "CheckedIn",
    registrationFee: 1500.00,
    amountPaid: 1500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0014-4b8a-9c1d-100000000014",
    registrationNumber: "CS27-0014",
    registrationDate: "2027-02-13T08:50:00Z",
    participantName: "Sophia Morales",
    contactNumber: "09304567890",
    email: "sophia.m@example.com",
    address: "102 Lapu-Lapu St., Legazpi City",
    carMakeModel: "Mercedes-AMG A45 S",
    plateNumber: "FGF 7878",
    registrationType: "VIP",
    status: "Pending",
    registrationFee: 5000.00,
    amountPaid: 2000.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0015-4b8a-9c1d-100000000015",
    registrationNumber: "CS27-0015",
    registrationDate: "2027-02-13T09:35:00Z",
    participantName: "Christian Diaz",
    contactNumber: "09315678901",
    email: "chris.diaz@example.com",
    address: "19 Silang St., Sorsogon City",
    carMakeModel: "Nissan Silvia S15",
    plateNumber: "GHG 9090",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 2500.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0016-4b8a-9c1d-100000000016",
    registrationNumber: "CS27-0016",
    registrationDate: "2027-02-13T10:45:00Z",
    participantName: "Patricia Cruz",
    contactNumber: "09326789012",
    email: "pat.cruz@example.com",
    address: "73 Roxas Ave., Tabaco City",
    carMakeModel: "Volkswagen Golf R",
    plateNumber: "HIH 1313",
    registrationType: "Exhibitor",
    status: "Cancelled",
    registrationFee: 1500.00,
    amountPaid: 0.00,
    paymentStatus: "Unpaid"
  },
  {
    id: "3f2c9a1e-0017-4b8a-9c1d-100000000017",
    registrationNumber: "CS27-0017",
    registrationDate: "2027-02-13T13:20:00Z",
    participantName: "Angelo Fernandez",
    contactNumber: "09337890123",
    email: "angelo.f@example.com",
    address: "41 Osmena St., Juban, Sorsogon",
    carMakeModel: "Hyundai Elantra N",
    plateNumber: "IJI 2424",
    registrationType: "Competitor",
    status: "Confirmed",
    registrationFee: 2500.00,
    amountPaid: 1000.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0018-4b8a-9c1d-100000000018",
    registrationNumber: "CS27-0018",
    registrationDate: "2027-02-13T15:05:00Z",
    participantName: "Nicole Sy",
    contactNumber: "09348901234",
    email: "nicole.sy@example.com",
    address: "60 General Luna St., Naga City",
    carMakeModel: "Lexus RC F",
    plateNumber: "JKJ 3535",
    registrationType: "VIP",
    status: "CheckedIn",
    registrationFee: 5000.00,
    amountPaid: 5000.00,
    paymentStatus: "Paid"
  },
  {
    id: "3f2c9a1e-0019-4b8a-9c1d-100000000019",
    registrationNumber: "CS27-0019",
    registrationDate: "2027-02-14T08:15:00Z",
    participantName: "Vincent Reyes",
    contactNumber: "09359012345",
    email: "vincent.r@example.com",
    address: "29 Taft St., Sorsogon City",
    carMakeModel: "Honda Integra Type R DC5",
    plateNumber: "KLK 4646",
    registrationType: "Exhibitor",
    status: "Pending",
    registrationFee: 1500.00,
    amountPaid: 500.00,
    paymentStatus: "Partial"
  },
  {
    id: "3f2c9a1e-0020-4b8a-9c1d-100000000020",
    registrationNumber: "CS27-0020",
    registrationDate: "2027-02-14T09:50:00Z",
    participantName: "Katrina Gomez",
    contactNumber: "09360123456",
    email: "kat.gomez@example.com",
    address: "110 Magallanes St., Sorsogon City",
    carMakeModel: "Chevrolet Camaro SS",
    plateNumber: "LML 5757",
    registrationType: "Competitor",

status: "Confirmed",
registrationFee: 2500.00,
amountPaid: 2500.00,
paymentStatus: "Paid"
},
{
id: "3f2c9a1e-0021-4b8a-9c1d-100000000021",
registrationNumber: "CS27-0021",
registrationDate: "2027-02-14T11:10:00Z",
participantName: "Miguel Ocampo",
contactNumber: "09371234567",
email: "miguel.o@example.com",
address: "82 Laurel St., Castilla, Sorsogon",
carMakeModel: "Toyota Land Cruiser 300",
plateNumber: "MNM 6868",
registrationType: "Exhibitor",
status: "Confirmed",
registrationFee: 1500.00,
amountPaid: 1500.00,
paymentStatus: "Paid"
},
{
id: "3f2c9a1e-0022-4b8a-9c1d-100000000022",
registrationNumber: "CS27-0022",
registrationDate: "2027-02-14T13:40:00Z",
participantName: "Andrea Soriano",
contactNumber: "09382345678",
email: "andrea.s@example.com",
address: "15 Escolta St., Legazpi City",
carMakeModel: "Mini John Cooper Works",
plateNumber: "NON 7979",
registrationType: "Exhibitor",
status: "Cancelled",
registrationFee: 1500.00,
amountPaid: 0.00,
paymentStatus: "Unpaid"
},
{
id: "3f2c9a1e-0023-4b8a-9c1d-100000000023",
registrationNumber: "CS27-0023",
registrationDate: "2027-02-14T14:55:00Z",
participantName: "Joshua Mercado",
contactNumber: "09393456789",
email: "josh.mercado@example.com",
address: "94 Paterno St., Sorsogon City",
carMakeModel: "Subaru BRZ",
plateNumber: "OPO 8080",
registrationType: "Competitor",
status: "Pending",
registrationFee: 2500.00,
amountPaid: 0.00,
paymentStatus: "Unpaid"
},
{
id: "3f2c9a1e-0024-4b8a-9c1d-100000000024",
registrationNumber: "CS27-0024",
registrationDate: "2027-02-15T08:20:00Z",
participantName: "Clarissa Velasco",
contactNumber: "09454567890",
email: "clarissa.v@example.com",
address: "37 Recto Ave., Naga City",
carMakeModel: "Nissan 370Z Nismo",
plateNumber: "PQP 9191",
registrationType: "Competitor",
status: "Confirmed",
registrationFee: 2500.00,
amountPaid: 2500.00,
paymentStatus: "Paid"
},
{
id: "3f2c9a1e-0025-4b8a-9c1d-100000000025",
registrationNumber: "CS27-0025",
registrationDate: "2027-02-15T10:00:00Z",
participantName: "Bryan Domingo",
contactNumber: "09465678901",
email: "bryan.domingo@example.com",
address: "50 Aurora Blvd., Sorsogon City",
carMakeModel: "Mitsubishi Eclipse GSX",
plateNumber: "QRQ 0202",
registrationType: "Exhibitor",
status: "Pending",
registrationFee: 1500.00,
amountPaid: 0.00,
paymentStatus: "Unpaid"
}
];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function getRegistrations({
participantName = "",
type = "",
status = "",
page = 1,
pageSize = 10,
} = {}) {
await delay(350);
let filtered = [...SAMPLE_REGISTRATIONS];
if (participantName.trim()) {
const query = participantName.trim().toLowerCase();
filtered = filtered.filter((item) =>
item.participantName.toLowerCase().includes(query)
);
}
if (type && type !== "All") {
filtered = filtered.filter((item) => item.registrationType === type);
}
if (status && status !== "All") {
filtered = filtered.filter((item) => item.status === status);
}
const totalCount = filtered.length;
const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
const safePage = Math.min(Math.max(1, page), totalPages);
const startIndex = (safePage - 1) * pageSize;
const items = filtered.slice(startIndex, startIndex + pageSize);
return {
items,
page: safePage,
pageSize,
totalCount,
totalPages,
};
}
export async function getSummary() {
await delay(250);
const totalRegistrations = SAMPLE_REGISTRATIONS.length;
const confirmed = SAMPLE_REGISTRATIONS.filter((r) => r.status === "Confirmed").length;
const checkedIn = SAMPLE_REGISTRATIONS.filter((r) => r.status === "CheckedIn").length;
const pending = SAMPLE_REGISTRATIONS.filter((r) => r.status === "Pending").length;
const cancelled = SAMPLE_REGISTRATIONS.filter((r) => r.status === "Cancelled").length;
const totalFees = SAMPLE_REGISTRATIONS.reduce((sum, r) => sum + r.registrationFee, 0);
const totalPayments = SAMPLE_REGISTRATIONS.reduce((sum, r) => sum + r.amountPaid, 0);
const uncollectedPayments = totalFees - totalPayments;
return {
totalRegistrations,
confirmed,
checkedIn,
pending,
cancelled,
totalFees,
totalPayments,
uncollectedPayments,
};
}