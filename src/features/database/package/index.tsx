import { DatabasePackageContent } from "./content";
import { AddPackageItemDialog } from "./dialog/add-package-item.dialog";
import { AddPackageDialog } from "./dialog/add-package.dialog";
import { DetailPackageDialog } from "./dialog/detail-package.dialog";
import { DatabasePackageHeader } from "./header";

export const DatabasePackage = () => {
  return (
    <main className="w-full p-4 flex flex-col">
      <DatabasePackageHeader />
      <DatabasePackageContent />
      {/* <DatabasePackageFooter /> */}

      {/* dialog  */}
      <AddPackageDialog />
      <AddPackageItemDialog />
      <DetailPackageDialog />
    </main>
  );
};
