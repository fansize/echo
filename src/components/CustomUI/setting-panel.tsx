import { Eye, Languages, ListRestart, MoveLeft } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  toggleSubtitle: () => void;
  toggleAutoNext: () => void;
  onClickSwitch: (direction: "previous" | "next") => void;
};

export default function SettingPanel({
  toggleSubtitle,
  toggleAutoNext,
  onClickSwitch,
}: Props) {
  return (
    <div className="flex flex-row justify-center gap-4 mt-6 md:mt-8 mb-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onClickSwitch("previous")}
          />
        </PaginationItem>

        <Toggle
          variant={"outline"}
          size={"sm"}
          aria-label="Toggle bold"
          onClick={toggleSubtitle}
        >
          <Eye className="h-4 w-4" />
        </Toggle>

        {/* <Toggle variant={"outline"} size={"sm"} aria-label="Toggle bold">
          <Languages className="h-4 w-4" />
        </Toggle> */}

        <Toggle
          variant={"outline"}
          size={"sm"}
          aria-label="Toggle bold"
          onClick={toggleAutoNext}
        >
          <ListRestart className="h-4 w-4" />
        </Toggle>

        <PaginationItem>
          <PaginationNext href="#" onClick={() => onClickSwitch("next")} />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
}
