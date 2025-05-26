import * as yup from "yup";
import toast from "react-hot-toast";
import { Lock, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import { verifyToken } from "@/utils/verifty-token";
import { useThemeContext } from "../theme/ThemeProvider";

import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authAPI";

import { Form } from "../ui/form";
import { RHFInput } from "../form";
import { Button } from "../ui/button";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { primaryColor } = useThemeContext();

  const [login, { isLoading }] = useLoginMutation();

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {
    reset,
    // watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const isFormFilled = watch("email") && watch("password");

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading("Logging in...");

    try {
      const response = await login(data).unwrap();

      if (response.success) {
        const user = await verifyToken(response?.data?.accessToken);

        dispatch(setUser({ user, token: response?.data?.accessToken }));

        toast.success(
          response?.data?.needsPassowrdChange
            ? "Login successful. Please change your password to continue!"
            : response.message || "Logged in successfully!",
          {
            id: loadingToastId,
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (response?.data?.needsPassowrdChange) {
          navigate("/change-password", { replace: true });
        } else if (
          response?.data?.userRole === "accountant" ||
          response?.data?.userRole === "stock_manager"
        ) {
          navigate("/products", { replace: true });
          return;
        } else {
          navigate("/", { replace: true });
        }

        reset();
      }
    } catch (err) {
      toast.error(err?.data?.error || "Login failed. Please try again.", {
        id: loadingToastId,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      toast.dismiss(loadingToastId);
    }
  };
  return (
    <div className="w-full max-w-md relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-neutral-900/20 dark:to-neutral-100/20 rounded-lg" />

      <div className="relative bg-card text-card-foreground rounded-lg border shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold" style={{ color: primaryColor }}>
            Sign in to your account
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <RHFInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              icon={Mail}
            />

            <RHFInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={Lock}
            />

            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full custom-button"
            >
              {isLoading || isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
