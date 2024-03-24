import Link from "next/link";
import Image from "next/image";
import ModeToggle from "@/components/theme/toggle-theme-button";

const content_cn = {
  title: "喵喵英语",
  logo: "/logo.svg",
};

const navLinks = [
  { href: "/", text: "首页" },
  { href: "/episodes", text: "语料" },
  { href: "/wiki", text: "常见问题" },
];

export default function Nav() {
  return (
    <nav className="px-8 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between h-16 mx-auto max-w-2xl md:max-w-7xl">
        <div className="flex items-center">
          <Link className=" mr-4 md:mr-8" href="/">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={content_cn.logo}
                className="text-white"
                alt="logo"
                width={40}
                height={40}
              />
              <h2 className="text-lg md:text-xl font-semibold">
                {content_cn.title}
              </h2>
            </div>
          </Link>
          <div className="hidden md:block">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                className="inline-flex h-8 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                href={link.href}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex md:hidden">
          <ModeToggle />
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {/* <Button variant={"outline"} size="default">
            Sign in
          </Button> */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
