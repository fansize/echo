import { MoveLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};

export default function BackButton({ title }: Props) {
  return (
    <Link href="/episodes">
      <div className="flex flex-row gap-2 ml-1">
        <MoveLeft />
        <p className="">{title}</p>
      </div>
    </Link>
  );
}
