import { combinedSlug } from "@/lib/utils";

export type ConvexUserRaw = {
  _creationTime: number;
  _id: string;
  email: string;
  emailVerificationTime?: number;
  image?: string;
  name?: string;
};

export type Profile = {
  id: string;
  createdAtMs: number;
  email: string;
  emailVerifiedAtMs?: number;
  image?: string;
  name: string;
};

export const normalizeProfile = (raw: ConvexUserRaw | null): Profile | null => {
  if (!raw) return null;

  const extractedNameFromEmail = (email: string): string => {
    const userName = email.split("@")[0];

    return userName
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const name =
    raw.name && raw.name.trim().length > 0
      ? raw.name
      : extractedNameFromEmail(raw.email);

  return {
    id: raw._id,
    createdAtMs: raw._creationTime,
    email: raw.email,
    emailVerifiedAtMs: raw.emailVerificationTime,
    image: raw.image,
    name: combinedSlug(name),
  };
};
