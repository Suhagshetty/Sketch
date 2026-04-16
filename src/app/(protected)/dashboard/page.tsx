import { combinedSlug } from "@/lib/utils";
import { redirect } from "next/navigation";
import { SubscriptionEntitlementQuery } from "../../../../convex/query.config";

const Page = async () => {
  const { entitlement, profileName } = await SubscriptionEntitlementQuery();

  const slug = combinedSlug(profileName || "user");

  if (!entitlement._valueJSON) {
    redirect(`/dashboard/${slug}`);
  }

  redirect(`/dashboard/${slug}`);
};

export default Page;
