import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import banner from "../assets/loginBanner.png";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await axios.post("https://pms-backend-ochre.vercel.app/api/login", credentials);

      if (response.data.success) {
        console.log("Login successful:", response.data);
        // Store token in localStorage
        localStorage.setItem("authToken", response.data.token);
        // Store user information if needed
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <img
        src={banner}
        alt="Building"
        className=" w-full h-full object-cover"
      />

      {/* Login Form */}
      <div className="px-4 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-orange-500 mb-2">Welcome</h2>
          <p className="text-gray-600">Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={credentials.userEmail}
              onChange={(e) =>
                setCredentials({ ...credentials, userEmail: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={credentials.userPassword}
              onChange={(e) =>
                setCredentials({ ...credentials, userPassword: e.target.value })
              }
              className="w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Forgot Password?{" "}
            <a href="#" className="text-orange-500 font-medium">
              Contact Your Manager
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}