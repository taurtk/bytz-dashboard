// API URL for FastAPI backend
const API_URL = "https://bytz-be.onrender.com"; // Change if backend runs elsewhere

export async function signup(credentials: {
  email: string;
  password: string;
  retailerId: string;
  secretCode: string;
}) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  console.log(response)
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Signup failed");
  }
  return response.json();
}

export async function signin(credentials: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Signin failed");
  }
  return response.json();
}
