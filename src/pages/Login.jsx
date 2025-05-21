import * as yup from "yup";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Form } from "@/components/ui/form";
import { RHFInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";

import { verifyToken } from "@/utils/verifty-token";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/features/auth/authAPI";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

        toast.success(response.message || "Logged in successfully!", {
          id: loadingToastId,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (
          response.userRole === "super_admin" ||
          response.userRole === "admin"
        ) {
          navigate("/", { replace: true });
        }
        navigate("/products", { replace: true });

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
    <div className="min-h-screen w-full flex relative">
      {/* Theme toggle */}
      <div className="fixed bottom-8 right-8 z-50">
        <ModeToggle />
      </div>

      {/* Left side - Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg"
          alt="Dashboard Preview"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute top-4 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B38A2D] to-[#E1BE5D]" />
            <h1 className="text-2xl font-bold">Alishan</h1>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to Alishan</h2>
          <p className="text-sm text-gray-200">
            Your complete inventory management solution with real-time analytics
            and insights
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-neutral-900/20 dark:to-neutral-100/20 rounded-lg" />

          <div className="relative bg-card text-card-foreground rounded-lg border shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Sign in to your account</h2>
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
                  className="w-full bg-[#B38A2D] hover:bg-[#E1BE5D]"
                  disabled={isLoading}
                >
                  {isLoading || isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>

            <p className="text-sm text-center text-muted-foreground mt-6">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
