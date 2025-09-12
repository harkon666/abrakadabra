import { Input } from "@/components/ui/input";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { type KeyboardEvent, useCallback, useState } from "react";

export const GlobalSearch = () => {
  const search = useSearch({
    from: "/_layout/patient",
  }) as { q: string };

  const [q, setQ] = useState(search.q || "");
  const nav = useNavigate({ from: "/patient" });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      nav({
        to: "/patient",
        search: q
          ? ({ ...search, search: q } as never)
          : { registered: true, page: 1, limit: 20 },
      });
    }
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  }, []);

  return (
    <Input
      className="max-w-48"
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={q}
    />
  );
};
