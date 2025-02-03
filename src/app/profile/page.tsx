import { Metadata } from "next";
import { getLoggedInMember } from "@/wix-api/members";
import { getWixServerClient } from "@/lib/wix-client.server";
import { notFound } from "next/navigation";
import MemberInfoForm from "./MemberInfoForm";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account and preferences",
};

export default async function Page() {
    
  const member = await getLoggedInMember(getWixServerClient());
  if (!member) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <MemberInfoForm member={member} />
    </main>
  );
}
