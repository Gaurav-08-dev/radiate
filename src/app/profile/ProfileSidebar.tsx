"use client";
import { UserCircle, History, MapPin } from "lucide-react";
import { members } from "@wix/members";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "info",
    label: "MY INFORMATION",
    icon: <UserCircle className={`mr-3`} />,
  },
  { id: "orders", label: "MY ORDERS", icon: <History className={`mr-3`} /> },
  // { id: "address", label: "ADDRESS BOOK", icon: <MapPin className={`mr-3`} /> },
];

export default function ProfileSidebar({
  member,
  activeSection,
  setActiveSection,
}: {
  member: members.Member;
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  const firstName = member.contact?.firstName;
  const lastName = member.contact?.lastName;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500 sm:h-20 sm:w-20">
          {member.profile?.photo?.url ? (
            <img
              src={member.profile?.photo?.url}
              alt={member.profile?.nickname || "Profile"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <Avatar>
              <AvatarFallback>{firstName?.charAt(0) || ""}{lastName?.charAt(0) || ""}</AvatarFallback>
            </Avatar>
          )}
        </div>
        <h2 className="text-center text-base font-semibold sm:text-lg">
          {member.profile?.nickname || "Member"}
        </h2>
        <p className="max-w-full truncate text-center text-xs text-gray-500 sm:text-sm">
          {member.loginEmail}
        </p>
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
                  className={`flex w-full items-center rounded-md p-2 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
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
