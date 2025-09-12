import { ModeToggle } from "../mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { BreadcrumbComp } from "./breadcrumb";

export const Header = () => {
  return (
    <div className="flex justify-between rounded-md dark:bg-neutral bg-gray-200/20 dark:bg-neutral-600/20 py-1 px-4">
      <div className="flex items-center gap-1">
        <SidebarTrigger />
        <BreadcrumbComp />
      </div>
      <ModeToggle />
    </div>
  );
};
