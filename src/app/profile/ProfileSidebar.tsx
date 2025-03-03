"use client";
import { UserCircle,  History, MapPin } from "lucide-react";
import { members } from "@wix/members";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { id: "info", label: "MY INFORMATION", icon: <UserCircle className={`mr-3`} /> },
  { id: "orders", label: "MY ORDERS", icon: <History  className={`mr-3`}/> },
  { id: "address", label: "ADDRESS BOOK", icon: <MapPin  className={`mr-3`}/> },
];

export default function ProfileSidebar({ 
  member,
  activeSection, 
  setActiveSection 
}: { 
  member: members.Member, 
  activeSection: string, 
  setActiveSection: (section: string) => void }) {
  

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-3">
          {member.profile?.photo?.url ? (
            <img 
              src={member.profile.photo.url} 
              alt={member.profile?.nickname || "Profile"} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <UserCircle size={32} className="sm:size-40" />
          )}
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-center">{member.profile?.nickname || "Member"}</h2>
        <p className="text-xs sm:text-sm text-gray-500 text-center truncate max-w-full">{member.loginEmail}</p>
      </div>
      
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => {
            
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button 
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center p-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}