const getBaseUrl = () => {
  // Check if running in production or development
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_PRODUCTION_URL; // Set this in your .env file for production
};

const baseUrl = getBaseUrl();
export default baseUrl;