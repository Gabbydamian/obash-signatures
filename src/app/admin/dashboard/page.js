"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    // If not logged in as admin, redirect to homepage
    if (!isAdmin) {
      router.push("/");
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin panel! You have access to manage the site here.</p>
    </div>
  );
}
