import { Metadata } from "next";
import { getLoggedInMember } from "@/wix-api/members";
import { getWixServerClient } from "@/lib/wix-client.server";
import { notFound } from "next/navigation";
import ProfileLayout from "./ProfileLayout";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account and preferences",
};

export default async function Page() {
  const member = await getLoggedInMember(getWixServerClient());
  if (!member) notFound();
  
  return <ProfileLayout member={member} />;
}
