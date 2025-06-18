// Fetch all restaurants from FastAPI backend
const API_URL = "https://bytz-be-314178177189.europe-west1.run.app"; // Change if backend runs elsewhere

export async function getRestaurants() {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  return response.json();
}
