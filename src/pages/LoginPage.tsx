import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import type { LoginRequest } from "../types";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.token, data.role, data.name);
      navigate("/dashboard");
    },
  });

  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-container">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#191c1e] mb-2 tracking-tight">
            System Login
          </h1>
          <p className="text-[#444651] text-sm">Authenticate to access the dashboard</p>
        </div>

        {mutation.isError && (
          <div className="bg-[#ffdad6] border border-[#ba1a1a] text-[#93000a] p-3 rounded mb-6 text-sm">
            Invalid credentials provided.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="input-label">Email Address</label>
            <input
              type="email"
              placeholder="admin@system.local"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="input-field"
            />
            {errors.email && (
              <p className="text-[#ba1a1a] text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className="input-field"
            />
            {errors.password && (
              <p className="text-[#ba1a1a] text-xs mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn-primary"
            >
              {mutation.isPending ? "Authenticating..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-[#e5e7eb] text-center">
          <p className="text-sm text-[#444651]">
            Need an account?{" "}
            <Link to="/register" className="text-[#1e3a8a] hover:text-[#00236f] font-semibold underline decoration-1 underline-offset-2">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
