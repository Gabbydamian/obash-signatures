import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Link,
  Box,
  VStack,
  HStack,
  IconButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// ContactDetail component for displaying contact info (phone, email, address)
const ContactDetail = ({ icon, label, value, link }) => (
  <HStack alignItems="start" gap={2}>
    <Icon as={icon} w={8} h={8} />
    <VStack alignItems="start" spacing={1}>
      <FormLabel className="text-lg uppercase">{label}</FormLabel>
      {link ? (
        <Link href={link} className="underline uppercase">
          {value}
        </Link>
      ) : (
        <Text>{value}</Text>
      )}
    </VStack>
  </HStack>
);

// Reusable ContactFormInput component
const ContactFormInput = ({ id, label, type, value, onChange }) => (
  <FormControl mt={4}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Input
      focusBorderColor="white"
      size="lg"
      variant="flushed"
      id={id}
      type={type}
      className="w-full text-white"
      value={value}
      onChange={onChange}
    />
  </FormControl>
);

const ContactOverlay = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
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
    <Box className="fixed inset-0 z-50 flex justify-center items-center bg-black">
      <Box className="w-full max-w-5xl mx-auto flex items-center text-white">
        <VStack
          className="hidden lg:flex"
          w="50%"
          py={8}
          px={4}
          alignItems="start"
          spacing={8}
        >
          <Text as="h2" size="lg" className="text-5xl font-[500]">
            OBASH SIGNATURES
          </Text>
          <ContactDetail
            icon={PhoneIcon}
            label="Phone"
            value="(234) 807 414 5068"
            link="tel:8074145068"
          />
          <ContactDetail
            icon={EnvelopeIcon}
            label="Email"
            value="contact@obashsignatures.com"
            link="mailto:contact@obashsignatures.com"
          />
          <ContactDetail
            icon={MapIcon}
            label="Address"
            value="1511 CHAPALA STREET SANTA BARBARA CA 93101"
          />
        </VStack>
        <Box className="w-full lg:w-1/2" p={8}>
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
                focusBorderColor="white"
                variant="flushed"
                id="message"
                className="w-full text-white"
                value={formData.message}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              _hover={{ backgroundColor: "#dedede" }}
              variant="solid"
              size="lg"
              backgroundColor="white"
              className="mt-4 px-12 text-black rounded-none uppercase font-[500]"
            >
              Submit
            </Button>
          </form>
          {status && <Text mt={4}>{status}</Text>}
        </Box>
      </Box>
      <IconButton
        onClick={onClose}
        className="absolute top-8 right-8"
        icon={<XMarkIcon />}
        variant="unstyled"
        aria-label="Close"
        size="lg"
        color={"white"}
      />
    </Box>
  );
};

export default ContactOverlay;
