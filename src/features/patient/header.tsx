import { GlobalSearch } from "./input/search.input";

export const PatientHeader = () => {
  return (
    <header className="flex justify-between">
      <div className="flex gap-2">
        <GlobalSearch />
      </div>
    </header>
  );
};
