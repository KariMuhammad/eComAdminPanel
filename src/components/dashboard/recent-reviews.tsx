import { RecentReview } from "./recent-review";

export default function RecentReviews() {
  return (
    <div>
      <h3 className="font-bold border-b-2 text-xl p-2">Recent Reviews</h3>
      <ul className="m-0 p-2">
        <li className="flex items-center justify-between py-2">
          <RecentReview
            img="/public/logo.svg"
            review_comment="Wiper blades Brandix WL2"
            reviewed_by="Jessica gracia"
            rates={4}
          />
        </li>
      </ul>
    </div>
  );
}
