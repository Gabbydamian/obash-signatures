import { useListings } from "@/context/ListingsContext";

const AdminNav = () => {
  const { listings } = useListings();
  return (
    <div className="flex flex-col gap-4 mt-4 shadow-md w-full p-4">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="text-md text-gray-500">
        Welcome to the admin panel. Here you can manage all the listings on the
        platform.
      </p>
      <p className="text-md text-gray-500">
        You have a total of <span className="font=bold">{listings.length}</span>{" "}
        listings on the platform.
      </p>
    </div>
  );
};

export default AdminNav;
