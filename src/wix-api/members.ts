import { WixClient } from "@/lib/wix-client.base";
import { members } from "@wix/members";
import { cache } from "react";

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
  const response = await wixClient.auth.register({
    email: email,
    password: password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      phones: [phone],
    },
  }).then((res) => {
    console.log(res);
  })
  return response;

}