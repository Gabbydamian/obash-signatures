import { Montserrat } from "next/font/google";
import { Barlow_Condensed } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700", "800"],
});

export const fonts = {
  montserrat,
  barlowCondensed,
};
