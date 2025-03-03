import { Metadata } from "next";
import { getLoggedInMember } from "@/wix-api/members";
import { getWixServerClient } from "@/lib/wix-client.server";
import { notFound } from "next/navigation";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account and preferences",
};

export default async function Page() {
  const member = await getLoggedInMember(getWixServerClient());
  if (!member) notFound();
  

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <ProfileContent member={member} />
      </div>
    </main>
  );
}
