import { AddPackageItemDialogButton } from "./dialog/add-package-item.dialog";
import { AddPackageDialogButton } from "./dialog/add-package.dialog";
import { GlobalSearch } from "./input/search.input";

export const DatabasePackageHeader = () => {
  return (
    <header className="flex justify-between">
      <div className="flex gap-2">
        <GlobalSearch />
        <AddPackageDialogButton />
        <AddPackageItemDialogButton />
      </div>
    </header>
  );
};
