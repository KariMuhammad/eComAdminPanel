import { Star } from "lucide-react";

type RecentReviewProps = {
  img: string;
  review_comment: string;
  reviewed_by: string;
  rates: number;
};

export function RecentReview({
  img,
  review_comment,
  reviewed_by,
  rates,
}: RecentReviewProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div aria-label="image-l">
          <img src={img} className="w-9" />
        </div>

        <div className="flex flex-col">
          <span className="capitalize font-semibold text-lg">
            {review_comment}
          </span>
          <span className="text-slate-400">Reviewed by {reviewed_by}</span>
        </div>
      </div>

      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star fill={index < rates ? "yellow" : ""} stroke="#bbb" />
        ))}
      </div>
    </>
  );
}
