import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/common/form.field";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/services/queries/auth";
import type { LoginCredentials } from "@/types";
import { setUser } from "@/reducers/auth";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/lib/store";
import { ToastSuccess } from "@/utils/toast";
import { loginSchema } from "@/schemas/login.schema";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const nav = useNavigate({ from: "/login" });
  const { mutate, isPending } = useLoginMutation();

  const onSubmit = (data: LoginCredentials) => {
    mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("accessToken", res.data.result.accessToken);
        dispatch(setUser(res.data.result));
        nav({
          to: "/registration/patient",
          search: {
            page: 1,
            limit: 20,
          },
        });
        ToastSuccess(res.data.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ReusableFormField form={form} name="email" title="Email" />
        <ReusableFormField
          form={form}
          name="password"
          title="Password"
          type="password"
        />
        <Button className="w-full" disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};
