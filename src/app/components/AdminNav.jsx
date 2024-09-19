import { Image } from "@chakra-ui/react";

const AdminNav = () => {
  return (
    <div className="flex flex-col w-full outline-dashed outline-1 p-4">
      <Image src="/logo.svg" alt="logo" width={150} />
    </div>
  );
};

export default AdminNav;
