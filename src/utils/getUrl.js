const getBaseUrl = () => {
  // Check if running in production or development
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://obash-signatures.vercel.app"; 
};

const baseUrl = getBaseUrl();
export default baseUrl;
