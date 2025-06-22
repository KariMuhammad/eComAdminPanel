import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SideMenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  isFocus?: boolean;
  subMenuItems?: SideMenuItemProps[];

  // handleCollapsItems
  onClick: () => void;
};

export default function SideMenuItem({
  label,
  icon,
  isFocus = false,
  subMenuItems = [],
  onClick,
}: SideMenuItemProps) {
  const isParent = subMenuItems.length > 0;

  const dropDownItemsRef = useRef<HTMLUListElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [margin, setMargin] = useState(0);
  const [focus, setFocus] = useState(isFocus);

  useEffect(() => {
    if (!isFocus) {
      setMargin(0);
      return;
    }

    if (dropDownItemsRef.current) {
      // Wait for DOM to update (render submenu)
      setTimeout(() => {
        const height = dropDownItemsRef.current?.scrollHeight || 0;
        setMargin(showDropdown ? height + 10 : 0);
      }, 10); // 1 frame delay is enough
    }
  }, [isFocus, showDropdown]);

  const toggleDropdown = () => {
    onClick();
    setShowDropdown((p) => !p);
  };

  return (
    <button
      className={cn({
        "relative group w-full bg-brand-50 text-brand-500 cursor-pointer rounded-md":
          true,
        "bg-brand-400 text-white": isFocus,
      })}
      style={{
        marginBottom: margin,
        transition: "all",
      }}
    >
      <div
        className={cn({
          "p-2 flex justify-between items-center": true,
        })}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="block">{icon}</span>}
          <span className="block">{label}</span>
        </div>

        {subMenuItems.length > 0 && (
          <ArrowDown
            onClick={toggleDropdown}
            className={cn({
              "w-5 transition-all": true,
              "rotate-0": showDropdown,
              "rotate-180": !showDropdown,
            })}
          />
        )}
      </div>

      {subMenuItems.length > 0 && (
        <ul
          ref={dropDownItemsRef}
          aria-label="drop-down"
          className={cn({
            "w-full mt-1 absolute overflow-hidden top-full duration-300 transition-all":
              true,
            "max-h-0": !showDropdown,
            "max-h-screen": showDropdown,
          })}
        >
          {subMenuItems.map((props: SideMenuItemProps, index) => (
            <li className="">
              <SideMenuItem {...props} isFocus={index === 0 ? true : false} />
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
