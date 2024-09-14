"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    // Get admin credentials from environment variables
    const storedUserId = process.env.NEXT_PUBLIC_ADMIN_USER;
    const storedPasskey = process.env.NEXT_PUBLIC_ADMIN_PASS;

    if (userId === storedUserId && passkey === storedPasskey) {
      // If credentials match, store session (for example, localStorage or a token)
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid credentials");
      router.push("/404"); // Redirect to 404 if credentials are wrong
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Passkey"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
