import { CustomerContent } from "./content";
import { CustomerFooter } from "./footer";
import { CustomerHeader } from "./header";

export const Customer = () => {
  return (
    <main className="w-full p-4 flex flex-col ">
      <CustomerHeader />
      <CustomerContent />
      <CustomerFooter />
    </main>
  );
};
