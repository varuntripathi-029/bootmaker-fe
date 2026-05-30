import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getPublicContent,
  getUserContent,
  getAdminContent,
} from "../services/dataService";

const DashboardPage = () => {
  const { name, role, logout } = useAuth();
  const navigate = useNavigate();

  const publicQuery = useQuery({
    queryKey: ["publicContent"],
    queryFn: getPublicContent,
  });

  const userQuery = useQuery({
    queryKey: ["userContent"],
    queryFn: getUserContent,
    enabled: role === "USER" || role === "ADMIN",
  });

  const adminQuery = useQuery({
    queryKey: ["adminContent"],
    queryFn: getAdminContent,
    enabled: role === "ADMIN",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {name} ({role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, {name}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Public Content Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Public Content
            </h3>
            {publicQuery.isLoading && (
              <p className="text-gray-500 text-sm">Loading...</p>
            )}
            {publicQuery.isError && (
              <p className="text-red-500 text-sm">Failed to load</p>
            )}
            {publicQuery.isSuccess && (
              <p className="text-gray-600 text-sm">{publicQuery.data}</p>
            )}
          </div>

          {/* User Content Card */}
          {(role === "USER" || role === "ADMIN") && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                User Content
              </h3>
              {userQuery.isLoading && (
                <p className="text-gray-500 text-sm">Loading...</p>
              )}
              {userQuery.isError && (
                <p className="text-red-500 text-sm">Failed to load</p>
              )}
              {userQuery.isSuccess && (
                <p className="text-gray-600 text-sm">{userQuery.data}</p>
              )}
            </div>
          )}

          {/* Admin Content Card */}
          {role === "ADMIN" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Admin Content
              </h3>
              {adminQuery.isLoading && (
                <p className="text-gray-500 text-sm">Loading...</p>
              )}
              {adminQuery.isError && (
                <p className="text-red-500 text-sm">Failed to load</p>
              )}
              {adminQuery.isSuccess && (
                <p className="text-gray-600 text-sm">{adminQuery.data}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
