"use client";
import MemberInfoForm from "./MemberInfoForm";
import Orders from "./Orders";
import { members } from "@wix/members";
import AddressBook from "./AddressBook";

export default function ProfileContent({ member, activeSection }: { member: members.Member, activeSection: string }) {
    
  return (
    <>
      {/* <div className="border-r border-gray-200 pr-10 md:col-span-1">
        <ProfileSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div> */}
      <div className="md:col-span-3">
        {activeSection === "info" && <MemberInfoForm member={member} />}
        {activeSection === "orders" && <Orders />}
        {activeSection === "address" && <AddressBook member={member} />}
      </div>
    </>
  );
}
