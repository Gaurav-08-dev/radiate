"use client";
import { members } from "@wix/members";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import { useState } from "react";

interface ProfileLayoutProps {
  member: members.Member;
}

export default function ProfileLayout({ member }: ProfileLayoutProps) {
  const [activeSection, setActiveSection] = useState("info");
  
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      {/* Mobile navigation toggle */}
      {/* <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-sm"
        >
          <span className="font-medium">
            {activeSection === "info" ? "Personal Info" : 
             activeSection === "settings" ? "Account Settings" :
             activeSection === "payment" ? "Payment Methods" : "Order History"}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div> */}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        {/* Mobile sidebar (collapsible) */}
        <div className="">
          <ProfileSidebar 
            member={member}
            activeSection={activeSection} 
            setActiveSection={(section) => {
              setActiveSection(section);
            }} 
          />
        </div>
        
        {/* Content area */}
        <div className="md:col-span-3">
          <ProfileContent member={member} activeSection={activeSection} />
        </div>
      </div>
    </main>
  );
}