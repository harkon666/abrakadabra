import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronsLeft,
  LucideChevronsRight,
  LucideChevronUp,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function DynamicPagination(props: {
  current: number;
  totalPages: number;
  currentLimit: number;
  disabled?: boolean;
  onSetPage?: (value: number) => unknown;
  onSetLimit?: (value: number) => unknown;
}) {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-xs font-bold bg">Rows per page</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={props.disabled}
            variant={"outline"}
            className="justify-start"
          >
            {props.currentLimit} <LucideChevronUp />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
          <DropdownMenuRadioGroup
            value={props.currentLimit + ""}
            onValueChange={(v) => props.onSetLimit?.(+v)}
          >
            <DropdownMenuRadioItem value={"10"}>10</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"20"}>20</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"50"}>50</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"100"}>100</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="font-bold text-foreground text-xs mx-2.5">
        Page {props.current} of {props.totalPages}
      </div>
      <Button
        disabled={props.current < 2 || props.disabled}
        variant={"outline"}
        size="icon"
        className="size-7"
        onClick={() => props.onSetPage?.(1)}
      >
        <LucideChevronsLeft />
      </Button>
      <Button
        disabled={props.current < 2 || props.disabled}
        variant={"outline"}
        size="icon"
        className="size-7"
        onClick={() => props.onSetPage?.(props.current - 1)}
      >
        <LucideChevronLeft />
      </Button>
      <Button
        variant={"outline"}
        size="icon"
        className="size-7"
        disabled={props.current >= props.totalPages || props.disabled}
        onClick={() => props.onSetPage?.(props.current + 1)}
      >
        <LucideChevronRight />
      </Button>
      <Button
        variant={"outline"}
        size="icon"
        disabled={props.current >= props.totalPages || props.disabled}
        onClick={() => props.onSetPage?.(props.totalPages)}
        className="size-7"
      >
        <LucideChevronsRight />
      </Button>
    </div>
  );
}
