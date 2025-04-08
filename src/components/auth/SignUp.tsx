"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { 
  Eye, EyeOff 
} from "lucide-react";
import { playfair } from "@/lib/utils";
import { useState } from "react";

import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getDirectLoginMemberToken, registerMember, 
  setTokensAndCookiesClient } from "@/wix-api/members";
import { useRouter } from "next/navigation";
import Image from "next/image";
import authBg from "@/assets/login page image.jpeg";

// Form schema with validation
const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  phone: z.string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

type FormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const result = await registerMember(wixBrowserClient, {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data?.lastName || "",
        phone: data.phone,
      });
      
      if(result?.loginState === 'SUCCESS') {
        const loginResponse = await getDirectLoginMemberToken(wixBrowserClient, result.data.sessionToken);
        // Use the client-specific function to set tokens and cookies
        setTokensAndCookiesClient(wixBrowserClient, loginResponse);
        // Navigate to home page and refresh to ensure middleware picks up the new cookie
        router.replace('/'); // Using replace instead of push to avoid having the URL in history
        router.refresh();
      } else {
        throw new Error('Registration did not complete successfully');
      }
    } catch (error: any) {
      console.error("Registration or login failed", error);
      // Display error message to user
      alert(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 relative md:block">
        <Image 
          src={authBg}
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-start md:justify-center px-6 py-12 md:w-1/2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={`${playfair.className} text-center text-2xl font-bold leading-9 tracking-tight`}>
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-[#500769] hover:text-[#500769]/80"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-4">
              <div className="w-full">
                <Input
                  type="text"
                  required
                  placeholder="First name"
                  className={`rounded-none ${errors.firstName ? "border-red-500" : ""}`}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Last name"
                  className={`rounded-none ${errors.lastName ? "border-red-500" : ""}`}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email address"
                className={`rounded-none ${errors.email ? "border-red-500" : ""}`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`rounded-none pr-10 ${errors.password ? "border-red-500" : ""}`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <div className={`flex items-center rounded-none border ${errors.phone ? "border-red-500" : ""} focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}>
                <div className="flex items-center border-r border-gray-200 px-3">
                  <span>+91</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  className="rounded-none border-0"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            

            <Button
              type="submit"
              className="w-full rounded-none bg-[#500769] text-white hover:bg-[#500769]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}
