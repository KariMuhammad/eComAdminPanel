import { Grid2X2 } from "lucide-react";
import SideMenuItem from "./SideMenuItem";

export default function Sidebar() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, index) => (
          <SideMenuItem
            icon={<Grid2X2 />}
            label={"Dashboard " + n}
            isFocus={index === 0}
            subMenuItems={[
              { label: "Ecommerce" },
              { label: "Analytics" },
              { label: "Marketing" },
              { label: "Stocks" },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
