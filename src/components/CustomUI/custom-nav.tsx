/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/I9EoicGxibh
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-[rgba(255,255,255,0.8)] backdrop-blur-md shadow-sm dark:bg-[rgba(26,32,44,0.9)]">
      <div className="container flex items-center justify-between h-14 px-4 md:px-6">
        <Link className="font-semibold" href="#">
          Acme Inc
        </Link>
        <nav className="hidden space-x-2 md:flex">
          <Link
            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            href="#"
          >
            Home
          </Link>
          <Link
            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            href="#"
          >
            Features
          </Link>
          <Link
            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            href="#"
          >
            Contact
          </Link>
        </nav>
        <div className="flex md:hidden">
          <Button size="icon" variant="outline">
            <SearchIcon className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button size="sm">Sign in</Button>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}