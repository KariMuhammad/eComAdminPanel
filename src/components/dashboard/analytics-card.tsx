import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AnalyticsCardProps = {
  title: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
  trendIcon: React.ReactNode;
  trendText: string;
};

export default function AnalyticsCard({
  title,
  value,
  trend,
  trendValue,
  trendIcon,
  trendText,
}: AnalyticsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {trendIcon}
            {trend === "up" ? "+" : "-"}
            {trendValue}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending {trend} this month {trendIcon}
        </div>
        <div className="text-muted-foreground">{trendText}</div>
      </CardFooter>
    </Card>
  );
}
