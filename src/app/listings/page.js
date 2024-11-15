"use client";
import { useState, useEffect, Suspense } from "react";
import { useListings } from "@/context/ListingsContext";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Listings from "./Listings";
import { Spinner } from "@chakra-ui/react";

export default function Main() {
  const { listings, loading, error } = useListings();

  return (
    <>
      <Nav />
      <Suspense
        fallback={
          <div className="grid place-items-center h-full my-auto">
            <Spinner size="xl" thickness="4px" />
          </div>
        }
      >
        <Listings data={listings} loading={loading} error={error} />
      </Suspense>
      <Footer />
    </>
  );
}
