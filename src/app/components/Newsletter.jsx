import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Checkbox,
  Link,
} from "@chakra-ui/react";

const Newsletter = () => {
  return (
    <div className="bg-[#F4F7F5]">
      <div className="container mx-auto flex flex-col gap-4 py-16">
        <h2 className="font-[600] w-full text-4xl uppercase text-center">
          Stay connected with our Newsletter
        </h2>
        <p className=" text-center">
          Stay up to date with latest news, promotions, listings, and more!
        </p>
        <FormControl
          id="email"
          className="w-4/5 mx-auto flex flex-col md:flex-row items-center gap-4 mt-6"
        >
          {/* <FormLabel className="absolute left-[99999px]"> Full Name</FormLabel> */}
          <Input
            size="lg"
            _placeholder={{ color: "#121417" }}
            variant="flushed"
            type="text"
            className="border-b-1 border-b-[#121417]"
            focusBorderColor="#121417"
            placeholder="Name"
          />
          {/* <FormLabel className="absolute left-[99999px]">
            Email address
          </FormLabel> */}
          <Input
            size="lg"
            _placeholder={{ color: "#121417" }}
            variant="flushed"
            type="email"
            className="border-b-1 border-b-[#121417]"
            focusBorderColor="#121417"
            placeholder="Email address"
          />
          <Button
            className="px-12 text-white rounded-none font-[400] uppercase"
            backgroundColor="#121417"
            size="lg"
            variant="solid"
            _hover={{ backgroundColor: "#000" }}
          >
            submit
          </Button>
        </FormControl>
        <Checkbox
          className="w-4/5 mx-auto flex items-start border-black"
          size="lg"
          defaultChecked
        >
          <p className="text-xs">
            By providing Obash SIgnatures your contact information, you
            acknowledge and agree to our{" "}
            <Link href="#" className=" underline">
              Privacy Policy
            </Link>{" "}
            and consent to receiving marketing communications, including through
            automated calls, texts, and emails, some of which may use artificial
            or prerecorded voices. This consent isn’t necessary for purchasing
            any products or services and you may opt out at any time. To opt out
            from emails, you can click on the unsubscribe link in the emails.
            Message and data rates may apply.
          </p>
        </Checkbox>
      </div>
    </div>
  );
};

export default Newsletter;
