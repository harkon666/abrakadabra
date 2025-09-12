import { Package } from "lucide-react";

const PackageCell = ({ packageId }: { packageId: string | undefined }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-muted/30 text-muted-foreground border-muted-foreground/20 border">
        <Package className="w-3 h-3" />
        Package {packageId}
      </div>
    </div>
  );
};
export default PackageCell;
