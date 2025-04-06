import type React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axios";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserSetNewPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121829] text-white">
        <div className="text-center space-y-4">
          <p className="text-red-500">Missing email or OTP.</p>
          <Link to="/user-forgot-password" className="text-[#5A5FE0] hover:underline">
            Go back to forgot password
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axiosInstance.post("/user-reset-password", {
        email,
        newPassword,
      });
      setMessage(res.data?.message);
      setError(res.data?.error)
      setTimeout(() => navigate("/user-login"), 2000);
    } catch (err: any) {
      setError(err?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121829] text-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Set New Password</h1>
        {message && <p className="text-center text-sm text-green-400 mb-4">{message}</p>}
        {error && <p className="text-center text-sm text-green-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="bg-[#1A2035] border-[#2A3050] text-white"
            />
          </div>
        
          <Button type="submit" className="w-full bg-[#5A5FE0] hover:bg-[#4A4FD0] text-white">
            Set Password
          </Button>
        </form>
        <div className="mt-8 text-center">
          <Link to="/user-login" className="inline-flex items-center text-[#5A5FE0] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
