"use client";
import { useState, useEffect, Suspense } from "react";
import { useListings } from "@/context/ListingsContext";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Listings from "./Listings";

export default function Main() {
  const { listings, loading, error } = useListings();

  return (
    <>
      <Nav />
      <Suspense fallback={<div>Loading listings...</div>}>
        <Listings data={listings} loading={loading} error={error} />
      </Suspense>
      <Footer />
    </>
  );
}
