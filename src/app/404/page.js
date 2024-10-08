import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">
        Oops! The page you&apos;re looking for does not exist.
      </p>
      <Link href="/" className="text-blue-500 underline">
        Go back to homepage
      </Link>
    </div>
  );
}
