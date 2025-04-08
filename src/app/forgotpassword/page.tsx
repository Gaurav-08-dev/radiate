"use client";

import { useState } from "react";
import { resetPassword } from "@/wix-api/members";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { wixBrowserClient } from "@/lib/wix-client.browser";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await resetPassword(wixBrowserClient, email);
      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      });
      setEmail("");
      setEmailError("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset instructions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-none">
        <CardHeader className="flex flex-col gap-2 px-6 py-4">
          <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
          {/* <CardDescription>
            Enter your registered email address to reset your password
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              required
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && (
              <p className="text-sm text-red-500">{emailError}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full rounded-none" 
            onClick={handleSubmit} 
            disabled={isLoading || !!emailError || email === ""}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
