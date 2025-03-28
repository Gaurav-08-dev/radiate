"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { playfair } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "@/hooks/auth";
import {
  getDirectLoginMemberToken,
  resetPassword,
  setTokensAndCookiesClient,
} from "@/wix-api/members";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import authBg from "@/assets/login page image.jpeg";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignIn() {
  const { login } = useAuth();

  const { toast } = useToast();
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoginStatus("loading");

      const response = await wixBrowserClient.auth.login({
        email: values.email,
        password: values.password,
      });

      switch (response.loginState) {
        case "SUCCESS":
          // Get the direct login token and set cookies
          const loginResponse = await getDirectLoginMemberToken(
            wixBrowserClient,
            response.data.sessionToken,
          );
          setTokensAndCookiesClient(wixBrowserClient, loginResponse);
          setLoginStatus("success");
          toast({
            description: "Successfully logged in!",
          });
          router.replace("/");
          router.refresh();
          break;

        case "FAILURE":
          let errorMessage = "Login failed";
          switch (response.errorCode) {
            case "invalidEmail":
              errorMessage = "The email address provided is invalid.";
              break;
            case "invalidPassword":
              errorMessage = "The password provided is incorrect.";
              break;
            case "resetPassword":
              errorMessage = "Please reset your password.";
              router.push("/forgot-password");
              break;
            case "emailAlreadyExists":
              errorMessage = "This email is already registered.";
              break;
            default:
              errorMessage = "Invalid email or password";
          }
          setLoginStatus("error");
          toast({
            variant: "destructive",
            description: errorMessage,
            duration: 3000,
          });
          break;
      }
    } catch (error) {
      setLoginStatus("error");
      console.error(error);
      toast({
        variant: "destructive",
        description: "An error occurred during login. Please try again.",
      });
    } finally {
      if (loginStatus !== "success") {
        setLoginStatus("idle");
      }
    }
  }

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
      <div className="flex w-full flex-col justify-start px-6 py-6 md:w-1/2 md:justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2
            className={`${playfair.className} text-center text-2xl font-bold leading-9 tracking-tight`}
          >
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-6"
          >
            <Input
              type="email"
              placeholder="Email address"
              className="rounded-none"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}

            <div>
              <Input
                type="password"
                placeholder="Password"
                className="rounded-none"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
              <div className="mt-2 text-right">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-[#500769] hover:text-[#500769]/80"
                  onClick={(e) => {
                    // e.stopPropagation();
                    e.preventDefault();
                    const email = 'g8111997@gmail.com';
                    resetPassword(wixBrowserClient, email);
                  }}
                >
                  Forgot password?
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-none bg-[#500769] text-white hover:bg-[#500769]/90"
              disabled={loginStatus === "loading"}
            >
              {loginStatus === "loading" ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Signing in...</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {/* Optional: Add a loading spinner here */}
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-none"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  setLoginStatus("loading");
                  // Call login without parameters for Google authentication
                  const response = await login();

                  // @ts-ignore
                  if (response && response.status === "SUCCESS") {
                    // Get the direct login token and set cookies
                    const loginResponse = await getDirectLoginMemberToken(
                      wixBrowserClient,
                      // @ts-ignore
                      response?.tokens?.sessionToken,
                    );
                    setTokensAndCookiesClient(wixBrowserClient, loginResponse);
                    setLoginStatus("success");
                    toast({
                      description: "Successfully logged in with Google!",
                    });
                    router.replace("/");
                  } else {
                    throw new Error("Google login failed");
                  }
                } catch (error) {
                  setLoginStatus("error");
                  console.error(error);
                  toast({
                    variant: "destructive",
                    description:
                      "An error occurred during Google login. Please try again.",
                  });
                } finally {
                  if (loginStatus !== "success") {
                    setLoginStatus("idle");
                  }
                }
              }}
              disabled={loginStatus === "loading"}
            >
              {/* <FcGoogle className="mr-2 h-5 w-5" /> */}
              Continue with Google
            </Button>

            <p className="text-center text-sm text-gray-500">
              New user?{" "}
              <Link
                href="/signup"
                className="font-semibold leading-6 text-[#500769] hover:text-[#500769]/80"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
