import React, { useState } from "react";
import Footer from "../../components/Footer";
import { Link } from "@chakra-ui/react";
import {
  Image,
  Stack,
  Text,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ContactFormInput = ({ id, label, type, value, onChange }) => (
  <FormControl mt={4}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Input
      focusBorderColor="black"
      size="lg"
      variant="flushed"
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border-b border-[#6d6a6a] text-black mt-[-14px]"
    />
  </FormControl>
);

const Listing = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I am interested in this property at ${listing.address}, costing ₦${listing.price}, and would like to schedule a viewing.`,
  });
  const [status, setStatus] = useState("");

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % listing.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("An error occurred while sending the message.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full h-[24rem] relative overflow-hidden">
        <Image
          width={"100%"}
          height={400}
          fit={"cover"}
          src={listing.images[currentImageIndex]}
          alt={listing.address}
          className="h-[24rem] hover:scale-[1.02] transition-transform duration-500 ease-in-out"
        />

        <Button
          onClick={prevImage}
          className="absolute left-0 top-1/2 h-full transform -translate-y-1/2 text-white bg-black p-2 px-3 opacity-75 hover:opacity-90 hover:bg-black transition-opacity rounded-none"
        >
          <ChevronLeftIcon className="size-6" />
        </Button>
        <Button
          onClick={nextImage}
          className="absolute right-0 top-1/2 h-full transform -translate-y-1/2 text-white bg-black p-2 px-3 opacity-75 hover:opacity-90 hover:bg-black transition-opacity rounded-none"
        >
          <ChevronRightIcon className="size-6" />
        </Button>
      </div>

      <div className="container mx-auto py-4 lg:px-16 px-4 mb-12">
        <Stack direction="column" mt={3} spacing={3}>
          <Text as={"h2"} className="text-3xl font-bold uppercase">
            {listing.type}, {listing.address}
          </Text>
          <Text as={"h3"} className="text-xl font-semibold text-gray-900">
            {`${listing.address}, ${listing.city}, ${listing.city
              .slice(0, 3)
              .toUpperCase()} ${listing.zipCode}`}
          </Text>
          <hr className="border-gray-900" />
          <Text as={"h3"} className="text-2xl font-semibold text-gray-900">
            ₦ {listing.price}
          </Text>
          <Text as={"p"} className="text-justify">
            {listing.description
              ? listing.description
              : `This stunning property located in the prestigious Victoria Island area of Lagos...`}
          </Text>
          <Text as={"h3"} className="text-xl text-gray-900 font-semibold">
            {listing.details}
          </Text>
          <Link href={"/listings"} className="text-blue-700 underline">
            Go back to see all available listings
          </Link>
        </Stack>

        <Stack
          direction={"column"}
          mt={10}
          spacing={3}
          className="w-2/3 mx-auto"
        >
          <Text
            as={"h2"}
            className="text-3xl font-bold uppercase w-full text-center underline"
          >
            Contact Agent
          </Text>
          <form onSubmit={handleSubmit}>
            <ContactFormInput
              id="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <ContactFormInput
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <ContactFormInput
              id="phone"
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <FormControl mt={4}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                focusBorderColor="black"
                variant="flushed"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full text-black border-b border-[#6d6a6a]"
              />
            </FormControl>
            <input
              type="hidden"
              name="listing_address"
              value={formData.listing_address}
            />
            <input
              type="hidden"
              name="listing_city"
              value={formData.listing_city}
            />
            <input
              type="hidden"
              name="listing_price"
              value={formData.listing_price}
            />
            <Button
              type="submit"
              _hover={{ backgroundColor: "#000" }}
              alignSelf={"end"}
              variant="solid"
              size="md"
              backgroundColor="#141414"
              className="mt-4 px-4 text-[#dedede] rounded-none uppercase font-[500]"
            >
              Send Message
            </Button>
          </form>
          {status && <p>{status}</p>}
        </Stack>
      </div>
      <Footer />
    </>
  );
};

export default Listing;
