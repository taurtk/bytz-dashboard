// Fetch all restaurants from FastAPI backend
const API_URL = "http://localhost:8000"; // Change if backend runs elsewhere

export async function getRestaurants() {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  return response.json();
}
