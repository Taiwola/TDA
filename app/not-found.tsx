// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-9xl font-bold text-burnt-gold">404</h1>
      <p className="text-2xl mt-4 text-gray-400">Oops! Page not found.</p>
      <p className="text-lg text-gray-500 mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-burnt-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
