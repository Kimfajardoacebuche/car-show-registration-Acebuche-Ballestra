import { getRegistrations, getSummary } from "./sample-data";

// true = use sample data
// false = connect to the actual C# backend
const USE_SAMPLE_DATA = true;

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5205";

// Fetch registrations with search, filters, and pagination
export async function fetchRegistrations(params = {}) {
  if (USE_SAMPLE_DATA) {
    return getRegistrations(params);
  }

  const query = new URLSearchParams();

  if (params.participantName) {
    query.set("participantName", params.participantName);
  }

  if (params.type) {
    query.set("type", params.type);
  }

  if (params.status) {
    query.set("status", params.status);
  }

  query.set("page", params.page || 1);
  query.set("pageSize", params.pageSize || 10);

  const response = await fetch(
    `${API_URL}/api/registrations?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Cannot reach the registrations API.");
  }

  return await response.json();
}

// Fetch dashboard KPI summary
export async function fetchSummary() {
  if (USE_SAMPLE_DATA) {
    return getSummary();
  }

  const response = await fetch(`${API_URL}/api/registrations/summary`);

  if (!response.ok) {
    throw new Error("Cannot load the dashboard summary.");
  }

  return await response.json();
}