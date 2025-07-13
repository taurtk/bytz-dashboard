// Fetch orders for a restaurant from FastAPI backend
const API_URL = "https://bytz-be.onrender.com"; // Change if backend runs elsewhere

export async function getOrdersByRestaurant(restaurantId: string) {
  const response = await fetch(`${API_URL}/orders/${restaurantId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
}
