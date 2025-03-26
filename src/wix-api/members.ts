import { WixClient } from "@/lib/wix-client.base";
import { members } from "@wix/members";
import { cache } from "react";
// import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "@/lib/constants";

export interface AddressProps {
  addressLine2: string;
  city: string;
  subdivision: string;
  postalCode: string;
  country: string;
}

let address: members.Address[] | [];
export const getLoggedInMember = cache(
  async (wixClient: WixClient): Promise<members.Member | null> => {
    if (!wixClient.auth.loggedIn()) {
      return null;
    }

    const memberData = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    address = memberData?.member?.contact?.addresses || [];
    return memberData.member || null;
  },
);

export interface UpdateMemberInfoProps {
  firstName: string;
  lastName: string;
  birthdate: string | "";
  phones: string | "";
}

export async function updateMemberInfo(
  wixClient: WixClient,
  {
    firstName,
    lastName,
      birthdate,
    phones,
  }: UpdateMemberInfoProps,
) {
  const loggedInMember = await getLoggedInMember(wixClient);

  if (!loggedInMember?._id) {
    throw Error("Member not logged in");
  }

  return wixClient.members.updateMember(loggedInMember._id, {
    contact: {
      firstName,
      lastName,
      birthdate: birthdate,
      phones: phones ? [phones] : [],
    },
  });
}

export async function updateMemberAddress(
  wixClient: WixClient,
  { addressLine2, city, subdivision, postalCode, country }: AddressProps,
) {
  const loggedInMember = await getLoggedInMember(wixClient);

  if (!loggedInMember?._id) {
    throw Error("Member not logged in");
  }

  return wixClient.members.updateMember(loggedInMember._id, {
    contact: {
      addresses: [
        ...address,
        {
          addressLine2,
          city,
          subdivision,
          postalCode,
          country:"IN",
        },
      ],
    },
  });
}

export interface RegisterMemberProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export async function registerMember(wixClient: WixClient, { email, password, firstName, lastName, phone }: RegisterMemberProps) {
   const res = await wixClient.auth.register({
    email: email,
    password: password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      phones: [phone],
    },
  })
  
  return res;
}

export async function getDirectLoginMemberToken(wixClient: WixClient, sessionToken: string) {
  const res = await wixClient.auth.getMemberTokensForDirectLogin(sessionToken);
  return res;
}

// For server components
// export async function setTokensAndCookiesServer(res: any) {
//   cookies().set(WIX_SESSION_COOKIE, JSON.stringify(res), {
//     maxAge: 60 * 60 * 24 * 14,
//     secure: process.env.NODE_ENV === "production",
//   });
// }

// For client components
export function setTokensAndCookiesClient(wixClient: WixClient, res: any) {
  wixClient.auth.setTokens(res);
  
  // Set the cookie directly in the browser
  document.cookie = `${WIX_SESSION_COOKIE}=${JSON.stringify(res)}; path=/; max-age=${60 * 60 * 24 * 14}; ${process.env.NODE_ENV === "production" ? "secure;" : ""}`;
}

// Keep this for backward compatibility but implement it based on environment
export async function setTokensAndCookies(wixClient: WixClient, res: any) {
  
  wixClient.auth.setTokens(res);
  
  // Note: This will only work in client components
  if (typeof document !== 'undefined') {
    document.cookie = `${WIX_SESSION_COOKIE}=${JSON.stringify(res)}; path=/; max-age=${60 * 60 * 24 * 14}; ${process.env.NODE_ENV === "production" ? "secure;" : ""}`;
  }
  // The server-side part would need to be called separately
}



