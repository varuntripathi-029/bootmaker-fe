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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-container">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#191c1e] mb-2 tracking-tight">
            Provision Account
          </h1>
          <p className="text-[#444651] text-sm">Register for system access</p>
        </div>

        {mutation.isSuccess && (
          <div className="bg-[#eff1f3] border border-[#757682] text-[#191c1e] p-3 rounded mb-6 text-sm font-medium">
            {mutation.data.message}{" "}
            <Link to="/login" className="text-[#1e3a8a] underline ml-1">
              Proceed to Login
            </Link>
          </div>
        )}

        {mutation.isError && (
          <div className="bg-[#ffdad6] border border-[#ba1a1a] text-[#93000a] p-3 rounded mb-6 text-sm">
            {(mutation.error as Error).message || "Provisioning failed"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="input-label">Administrator Name</label>
            <input
              type="text"
              placeholder="Full Legal Name"
              {...register("name", { required: "Name is required" })}
              className="input-field"
            />
            {errors.name && (
              <p className="text-[#ba1a1a] text-xs mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="input-label">System Email</label>
            <input
              type="email"
              placeholder="user@system.local"
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
            <label className="input-label">Secure Password</label>
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
              <p className="text-[#ba1a1a] text-xs mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="input-label">RBAC Role Assignment</label>
            <select
              {...register("role", { required: "Role assignment is required" })}
              className="input-field appearance-none bg-white"
            >
              <option value="">Select clearance level</option>
              <option value="USER">Level 1 - USER</option>
              <option value="ADMIN">Level 2 - ADMIN</option>
            </select>
            {errors.role && (
              <p className="text-[#ba1a1a] text-xs mt-1 font-medium">{errors.role.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn-primary"
            >
              {mutation.isPending ? "Provisioning..." : "Submit Registration"}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-[#e5e7eb] text-center">
          <p className="text-sm text-[#444651]">
            Already provisioned?{" "}
            <Link to="/login" className="text-[#1e3a8a] hover:text-[#00236f] font-semibold underline decoration-1 underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
