// context/ListingsContext.js
import { createContext, useState, useEffect } from "react";

export const ListingsContext = createContext();

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const res = await fetch("/api/listings");
      const data = await res.json();
      setListings(data);
    }
    fetchListings();
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, setListings }}>
      {children}
    </ListingsContext.Provider>
  );
}
