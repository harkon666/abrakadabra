import { LoginForm } from "./form";

const Login = () => {
  return (
    <main className="max-h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-100 dark:to-gray-800 to-gray-200 ">
      <div className="w-60">
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
