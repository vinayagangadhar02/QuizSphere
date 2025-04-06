
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "@/api/axios";

export default function UserForgotPassword() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [error,setError]=useState("")
  const [timeLeft, setTimeLeft] = useState(600); 
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === "otp") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user-send-otp", { email });
      setMessage(res.data?.message);
      setError(res.data?.error);
      setStep("otp");
    } catch (err: any) {
      setError(err?.error|| "Failed to send OTP");
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await axiosInstance.post("/user-verify-otp", {
        email,
        otp,
      });
      if (res.data.message.includes("successful")) {
        navigate("/user-set-password", { state: {email} });
      } else {
        setError(res.data.error);
      }
    } catch (err: any) {
      setError(err?.error || "OTP verification failed");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121829] text-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Reset your password</h1>
        {message && <p className="text-center text-sm text-green-400 mb-4">{message}</p>}
        {error && <p className="text-center text-sm text-red-400 mb-4">{error}</p>}

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
                placeholder="Enter your email"
                className="bg-[#1A2035] border-[#2A3050] text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-[#5A5FE0] hover:bg-[#4A4FD0] text-white">
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter OTP</label>
              <div className="flex justify-between gap-2">
                {otpDigits.map((digit, idx) => (
                  <Input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={(el) => (inputsRef.current[idx] = el)}
                    onChange={(e) => handleOTPChange(idx, e.target.value)}
                    className="text-center bg-[#1A2035] border-[#2A3050] text-white w-10 h-10"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-400 text-center">
              OTP expires in: {formatTime(timeLeft)}
            </p>
            <Button type="submit" className="w-full bg-[#5A5FE0] hover:bg-[#4A4FD0] text-white">
              Verify OTP
            </Button>
          </form>
        )}

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
