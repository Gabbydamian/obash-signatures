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
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import {
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { fonts } from "../font";

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

const ContactFormInput = ({ id, label, type }) => (
  <FormControl mt={4}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Input
      focusBorderColor="white"
      size="lg"
      variant="flushed"
      id={id}
      type={type}
      className="w-full text-white"
    />
  </FormControl>
);

const ContactOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          <Text
            as="h2"
            size="lg"
            className={`${fonts.barlowCondensed.variable} text-5xl font-[500]`}
          >
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
          <form>
            <ContactFormInput id="name" label="Name" type="text" />
            <ContactFormInput id="email" label="Email" type="email" />
            <ContactFormInput id="phone" label="Phone" type="tel" />
            <FormControl mt={4}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                focusBorderColor="white"
                variant="flushed"
                id="message"
                className="w-full text-white"
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
