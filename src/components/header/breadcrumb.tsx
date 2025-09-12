import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export const BreadcrumbComp = () => {
  const location = useLocation();
  const navigate = useNavigate({ from: "/" });
  const pathname = location.pathname.split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathname.map((path: string, idx) => (
          <>
            <BreadcrumbItem>
              <Button
                variant={"ghost"}
                className={`hover:bg-transparent w-fit px-0 hover:cursor-pointer capitalize`}
                onClick={() =>
                  navigate({
                    to: pathname.slice(0, pathname.indexOf(path) + 1).join("/"),
                  })
                }
              >
                {path.replace("-", " ")}
              </Button>
            </BreadcrumbItem>

            {idx == 0 && idx !== pathname.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
