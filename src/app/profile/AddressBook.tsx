"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { members } from "@wix/members";
import { useMembersAddress } from "@/hooks/members";
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name is required" }),
  fullAddress: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  postalCode: z.string().min(2, { message: "Postal/Zip code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number is required" }),
});

export default function AddressBook({ member }: { member: members.Member }) {

  const mutation =  useMembersAddress();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      fullAddress: "",
      city: "",
      postalCode: "",
      country: "India",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: any) => {
    // Add the new address to the addresses array
    mutation.mutate({
      addressLine2: data.fullAddress,
      city: data.city,
      subdivision: data.postalCode,
      postalCode: data.postalCode,
      country: data.country,
    });
    // setAddresses([...addresses, data]);
    // Reset form
    form.reset();
    // setIsAddingAddress(false);
  };

  useEffect(() => {
    setAddresses(member?.contact?.addresses || []);
  }, [member]);

  return (
    <div id="address" className="mb-12">
      <h2 className="mb-6 text-xl font-semibold">Address book</h2>

      {addresses.length > 0 && (
        <div className="mb-6 space-y-4">
          {addresses.map((address, index) => (
            <div key={address._id} className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">{address.addressLine || address.addressLine2}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.subdivision}
                  </p>
                  <p className="text-sm text-gray-600">{address.postalCode}</p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                </div>
                {/* <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      form.reset(address);
                      setIsAddingAddress(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setAddresses(addresses.filter((_, i) => i !== index));
                    }}
                  >
                    Delete
                  </Button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isAddingAddress ? (
        <Button
          onClick={() => setIsAddingAddress(true)}
          className="w-full border border-gray-300 bg-white py-6 text-black hover:bg-gray-50"
        >
          Add new address
        </Button>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Postal/Zip code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center rounded-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <div className="flex items-center gap-1 px-3">
                        {/* <img src="/flags/in.svg" alt="India" className="w-5 h-5" /> */}
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

            <Button
              type="submit"
              className="w-32 bg-gray-300 text-black hover:bg-gray-400"
              disabled={!form.formState.isValid}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setIsAddingAddress(false);
                form.reset();
              }}
              type="button"
              variant="outline"
              className="ml-5 w-32 bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
