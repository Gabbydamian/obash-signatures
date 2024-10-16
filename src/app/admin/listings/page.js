"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "../../components/AdminNav"
import AdminMain from "../../components/AdminMain"

export default function AdminListings() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    // If not logged in as admin, redirect to homepage
    if (!isAdmin) {
      router.push("/");
    }
  });

  return (
    <div className="mx-auto">
      <AdminNav />
      <AdminMain />
    </div>
  );
}
