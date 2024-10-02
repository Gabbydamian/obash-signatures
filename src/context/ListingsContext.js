"use client";
import { createContext, useState, useEffect, useContext } from "react";

// Create a context for listings
const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `https://obash-express-api.onrender.com/api/listings`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Raw API response:", result);

        const listings = Array.isArray(result) ? result : result.listings || [];
        const listingsData = listings[0]?.listings || [];
        setListings(listingsData);
        console.log("Processed listings:", listingsData);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, loading, error }}>
      {children}
    </ListingsContext.Provider>
  );
};

// Custom hook to use the listings context
export const useListings = () => {
  return useContext(ListingsContext);
};
