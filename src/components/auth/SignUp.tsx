"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { playfair } from "@/lib/utils";
import { useState } from "react";
// import { useMembersRegister } from "@/hooks/members";
import { registerMember } from "@/wix-api/members";
import { wixBrowserClient } from "@/lib/wix-client.browser";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
};

export default function SignUp() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const dob = watch("dob");

  const onSubmit = (data: FormData) => {
      const mutation = registerMember(wixBrowserClient, {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        });
        console.log(mutation);
    };


  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 bg-[url('/auth-bg.jpg')] bg-cover bg-center md:block" />

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
              <Input
                type="text"
                placeholder="First name"
                className="rounded-none"
                {...register("firstName", { required: true })}
              />
              <Input
                type="text"
                placeholder="Last name"
                className="rounded-none"
                {...register("lastName", { required: true })}
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email address"
                className="rounded-none"
                {...register("email", { required: true })}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-none pr-10"
                {...register("password", { required: true })}
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
            </div>

            <div className="flex items-center rounded-none border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <div className="flex items-center border-r border-gray-200 px-3">
                <span>+91</span>
              </div>
              <Input
                type="tel"
                placeholder="Phone number"
                className="rounded-none"
                {...register("phone", { required: true })}
              />
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-none text-left font-normal"
                  >
                    {dob ? format(dob, "PPP") : <span>Date of birth</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    fromDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(),new Date().getDate())}
                    toDate={new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate())}
                    mode="single"
                    selected={dob || new Date()}
                    onSelect={(date) => setValue("dob", date || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              type="submit"
              className="w-full rounded-none bg-[#500769] text-white hover:bg-[#500769]/90"
            >
              Create Account
            </Button>

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div> */}

            {/* <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold leading-6 text-[#500769] hover:text-[#500769]/80"
              >
                Sign in
              </Link>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}
