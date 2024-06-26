import Image from "next/image";
import { Link2 } from "lucide-react";

export default function Watermark() {
  return (
    <div className="flex flex-row justify-center items-center p-4 rounded-lg bg-slate-600/20 border mb-6 gap-2">
      <div className="flex flex-row items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
        <h2 className="text-lg md:text-xl font-semibold">喵喵英语</h2>
      </div>
      <div className="flex gap-2 pl-3">
        <Link2 className="pt-1 text-blue-300" />
        <p className="font-bold">https://echoenglish.pro</p>
      </div>
    </div>
  );
}
