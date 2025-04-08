"use client";

import { useMembersResetPassword } from "@/hooks/members";
import { members } from "@wix/members";
import { z } from "zod";
import { requiredString } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMembersUpdate } from "@/hooks/members";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";


const formSchema = z.object({
  loginEmail: requiredString,
  firstName: z.string(),
  lastName: z.string().optional(),
  phones: z.string().optional(),
  birthdate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface MemberInfoFormProps {
  member: members.Member;
}
export default function MemberInfoForm({ member }: MemberInfoFormProps) {
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginEmail: member.loginEmail || "",
      firstName: member.contact?.firstName || "",
      lastName: member.contact?.lastName || "",
      phones: member.contact?.phones?.[0] || "",
      birthdate: member.contact?.birthdate ? new Date(member.contact?.birthdate) : undefined,
    },
  });


  const mutation = useMembersUpdate();
  const resetPassword = useMembersResetPassword();

  async function onSubmit(values: FormValues) {
    mutation.mutate({
      firstName: values.firstName,
      lastName: values.lastName || "",
      birthdate: values?.birthdate ? format(values?.birthdate, "yyyy-MM-dd") : "",
      phones: values.phones || "",
    });
  }

  return (
    <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-7xl flex-col items-start justify-center space-y-5"
      >
        <div className="flex w-full flex-col gap-5">
          <FormField
            control={form.control}
            name="loginEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Login Email"
                    type="email"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-none",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Date of Birth</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="flex items-center rounded-none border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div className="flex items-center border-r border-gray-200 px-3">
                      <span>+91</span>
                    </div>
                    <Input
                      placeholder="Phone Number"
                      {...field}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
        </div>
        <LoadingButton
          className=""
          type="submit"
          isLoading={mutation.isPending}
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
    <div className="flex flex-col gap-5 mt-5 ">
      <Button variant="outline" className="rounded-none w-full hover:bg-primary/80 hover:text-white" 
      onClick={() => {
        resetPassword.mutate(member?.loginEmail || "");
      }}
      >Reset Password</Button>
    </div>
    </>
    
  );
}
