import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Youtube, Film } from "lucide-react";

export default function AddEpisode() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-lg"
        >
          <Plus size={20} className="overflow-hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/upload">
            <Film size={18} className="overflow-hidden mr-2" />
            本地视频
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Youtube size={18} className="overflow-hidden mr-2" />
          Youtube 链接
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
