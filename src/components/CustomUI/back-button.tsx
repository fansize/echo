import { MoveLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};

export default function BackButton({ title }: Props) {
  return (
    <div className="flex flex-row gap-2">
      <Link href="/episodes">
        <MoveLeft />
      </Link>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
