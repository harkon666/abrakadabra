import { DynamicPagination } from "@/components/pagination";
import { getRouteApi } from "@tanstack/react-router";

const router = getRouteApi("/_layout/customer");

export const CustomerFooter = () => {
  const data = router.useLoaderData();
  const search = router.useSearch();
  const nav = router.useNavigate();

  const setLimit = (value: number) =>
    nav({
      search: (prev) => {
        prev.page = 1;
        prev.limit = value;
        return prev;
      },
    });

  const setPage = (value: number) =>
    nav({
      search: (prev) => {
        prev.page = value;
        return prev;
      },
    });
  return (
    <footer className="w-full flex justify-end p-4">
      <DynamicPagination
        current={search.page || 1}
        totalPages={data?.metaData.totalPages || 1}
        currentLimit={search.limit || 10}
        onSetPage={setPage}
        onSetLimit={setLimit}
      />
    </footer>
  );
};
