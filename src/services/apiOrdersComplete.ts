// Mark an order as completed via FastAPI backend
const API_URL = "https://bytz-be-314178177189.europe-west1.run.app"; // Change if backend runs elsewhere

export async function markOrderCompleted(orderId: string) {
  const response = await fetch(`${API_URL}/orders/${orderId}/complete`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to mark order as completed");
  }
  return response.json();
}
