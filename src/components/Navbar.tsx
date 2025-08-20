import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-8 flex items-center shadow">
      <Link href="/" className="mr-8">
        <span className="text-xl font-bold tracking-wide cursor-pointer">
          Movies App
        </span>
      </Link>
      <div className="flex gap-6 text-base font-medium">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link href="/movies" className="hover:text-gray-300 transition-colors">
          Movies
        </Link>
        <Link href="/contact" className="hover:text-gray-300 transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
}
