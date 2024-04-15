import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AddEpisode() {
  return (
    <Link href="/upload">
      <Button
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-lg"
      >
        <Plus size={20} className="overflow-hidden" />
      </Button>
    </Link>
  );
}
