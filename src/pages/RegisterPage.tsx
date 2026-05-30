import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import type { RegisterRequest } from "../types";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const mutation = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = (data: RegisterRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md glass rounded-2xl p-8 z-10 relative shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Create Account
          </h1>
          <p className="text-slate-400 text-sm">Join us today to get started</p>
        </div>

        {mutation.isSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-3 rounded-lg mb-6 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {mutation.data.message}{" "}
            <Link to="/login" className="underline font-medium ml-2 hover:text-emerald-300">
              Go to Login
            </Link>
          </div>
        )}

        {mutation.isError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {(mutation.error as Error).message || "Registration failed"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="input-label">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className="input-field"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
            )}
          </div>

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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input-field"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="input-label">Account Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="input-field appearance-none bg-slate-800"
            >
              <option value="">Select a role</option>
              <option value="USER">Standard User</option>
              <option value="ADMIN">Administrator</option>
            </select>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1.5">{errors.role.message}</p>
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
                Creating Account...
              </span>
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
