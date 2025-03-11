"use client"
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
// import { FcGoogle } from "react-icons/fc";



const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignIn() {
  const { login } = useAuth();

  const { toast } = useToast();
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoginStatus('loading');

      const response = await wixBrowserClient.auth.login({
        email: values.email,
        password: values.password,
      });


      switch (response.loginState) {
        case "SUCCESS":
          setLoginStatus('success');
          toast({
            description: "Successfully logged in!",
          });
          router.push("/");
          router.refresh();
          break;

        case "EMAIL_VERIFICATION_REQUIRED":
          toast({
            description: "Please check your email for a verification code.",
            duration: 5000,
          });
          router.push("/verify-email"); // Create this route to handle verification
          break;

        case "OWNER_APPROVAL_REQUIRED":
          toast({
            description: "Your membership is pending approval from the site owner.",
            duration: 5000,
          });
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
          setLoginStatus('error');
          toast({
            variant: "destructive",
            description: errorMessage,
          });
          break;
      }
      
    } catch (error) {
      setLoginStatus('error');
      console.error(error);
      
      toast({
        variant: "destructive",
        description: "An error occurred during login. Please try again.",
      });
    } finally {
      if (loginStatus !== 'success') {
        setLoginStatus('idle');
      }
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 bg-[url('/auth-bg.jpg')] bg-cover bg-center md:block" />

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-start  md:justify-center  px-6 py-6 md:w-1/2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={`${playfair.className} text-center text-2xl font-bold leading-9 tracking-tight`}>
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Input
              type="email"
              placeholder="Email address"
              className="rounded-none"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}

            <div>
              <Input
                type="password"
                placeholder="Password"
                className="rounded-none"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
              <div className="mt-2 text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#500769] hover:text-[#500769]/80"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full rounded-none bg-[#500769] text-white hover:bg-[#500769]/90"
              disabled={loginStatus === 'loading'}
            >
              {loginStatus === 'loading' ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">Signing in...</span>
                  {/* Optional: Add a loading spinner here */}
                </div>
              ) : "Sign In"}
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
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
              disabled={loginStatus === 'loading'}
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