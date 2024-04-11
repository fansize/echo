import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ModeToggle from "@/components/theme/toggle-theme-button";

const navLinks = [{ href: "/episodes", text: "返回" }];

export default function PageNav() {
  return (
    <nav className="px-8 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between h-16 mx-auto max-w-2xl md:max-w-full">
        <div>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              className="inline-flex h-8 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              href={link.href}
            >
              <ChevronLeft />
              {link.text}
            </Link>
          ))}
        </div>
        <div className="flex md:hidden">
          <ModeToggle />
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
