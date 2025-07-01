import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import AnalyticsCard from "./analytics-card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <AnalyticsCard title="Total Revenue" value="$1,250.00" trend="up" trendValue="12.5%" trendIcon={<IconTrendingUp />} trendText="Visitors for the last 6 months" />
      <AnalyticsCard title="New Customers" value="1,234" trend="down" trendValue="20%" trendIcon={<IconTrendingDown />} trendText="Acquisition needs attention" />
      <AnalyticsCard title="Growth Rate" value="4.5%" trend="up" trendValue="4.5%" trendIcon={<IconTrendingUp />} trendText="Meets growth projections" />
      <AnalyticsCard
        title="Churn Rate"
        value="2.1%"
        trend="down"
        trendValue="0.3%"
        trendIcon={<IconTrendingDown />}
        trendText="Churn is decreasing month over month"
      />
    </div>
  )
}
