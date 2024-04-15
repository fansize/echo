import Link from "next/link";
import Container from "@/components/container/container";

export default function Footer() {
  return (
    <footer className=" bg-neutral-50 dark:bg-neutral-800/20 border-t border-neutral-200 dark:border-slate-100/20">
      <Container>
        <div className="mx-auto max-w-2xl py-16 md:max-w-7xl flex flex-col md:flex-row items-center justify-between">
          <div className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center md:text-left mb-10 lg:mb-0 md:pr-4 md:w-1/2">
            <h3>喵喵英语</h3>
            <h3 className="lg:text-[1.5rem]">The Echo Method.</h3>
          </div>

          <Link
            href="/"
            className="mx-3  hover:bg-white hover:text-black border  font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
          >
            学习方法
          </Link>
        </div>
      </Container>
    </footer>
  );
}
