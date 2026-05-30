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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md glass rounded-2xl p-8 z-10 relative shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">Sign in to your account</p>
        </div>

        {mutation.isError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Invalid email or password
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="input-label">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
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
              <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
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
              <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-primary mt-6"
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
