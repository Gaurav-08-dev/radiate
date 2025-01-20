"use client";

import useAuth from "@/hooks/auth";
import { members } from "@wix/members";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { LogInIcon, LogOutIcon, User, UserIcon } from "lucide-react";
import Link from "next/link";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  className?: string;
}

export default function UserButton({
  loggedInMember,
  className,
}: UserButtonProps) {
  const { login, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button title="Profile" type="button" className={className}>
          <User />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44 max-w-64">
        {loggedInMember && (
          <>
            <DropdownMenuLabel className="font-normal">
              Logged in as{" "}
              <span className="font-semibold text-[#500769]">
                {loggedInMember.contact?.firstName || loggedInMember.loginEmail}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile" className="flex items-center gap-2 pl-2">
              <UserIcon className="size-4" />
              Profile
            </Link>
            <DropdownMenuSeparator />
          </>
        )}

        {loggedInMember ? (
          <DropdownMenuItem className="" onClick={() => logout()}>
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="" onClick={() => login()}>
            <LogInIcon />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
