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
  onClickSwitch: (direction: "previous" | "next") => void;
};

export default function SwitchCaption({ onClickSwitch }: Props) {
  return (
    <>
      <Pagination className="pt-9">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onClickSwitch("previous")}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onClickSwitch("next")} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
