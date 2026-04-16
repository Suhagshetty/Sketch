import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { ConvexUserRaw, normalizeProfile } from "../types/user";
import { Id } from "../../convex/_generated/dataModel";

export const ProfileQuery = async () => {
  const token = await convexAuthNextjsToken();

  return await preloadQuery(api.user.getCurrentUser, {}, { token });
};

export const SubscriptionEntitlementQuery = async () => {
  const token = await convexAuthNextjsToken();

  const rawProfile = await ProfileQuery();

  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw | null,
  );

  if (!profile?.id) {
    return { entitlement: { _valueJSON: false }, profileName: "user" };
  }

  const entitlement = await preloadQuery(
    api.subscription.hasEntitlement,
    { userId: profile.id as Id<"users"> },
    { token },
  );

  return {
    entitlement,
    profileName: profile.name || "user",
  };
};
