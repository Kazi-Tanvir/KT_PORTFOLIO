import { getReviews } from "@/app/actions";
import ReviewsAdminClient from "./ReviewsAdminClient";

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  let reviews = [];
  try {
    reviews = await getReviews();
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }

  return <ReviewsAdminClient reviews={reviews} />;
}
