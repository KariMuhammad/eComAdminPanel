import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import ListPage from "@/layouts/page-list";
import type { AppDispatch } from "@/app/redux/store";
import { fetchCoupons, type CouponStateType } from "@/app/redux/features/coupons";
import useAuth from "@/hooks/use-auth";
import { DiscountType } from "@/types";
import { Coins, PercentCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function CouponList() {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const { coupons } = useSelector<RootState, CouponStateType>(
    (store) => store.coupons
  );

  useEffect(() => {
    dispatch(fetchCoupons(user?.token!));
  }, []);

  console.log("coupons", coupons);

  return (
    <ListPage
      title="Coupons"
      buttonLabel="Add Coupon"
      buttonUrl="/coupons/add"
      columns={["id", "Code", "Discount Type", "Discount", "Active"]}
      data={coupons}
      renderRow={(coupon, index) => (
        <tr key={index} className="text-center">
          <td>{index}</td>
          <td>{coupon.code}</td>
          <td className="p-3"><span className="block w-fit mx-auto">{coupon.discountType === DiscountType.PERCENTAGE ? <PercentCircle className="w-7 h-7" /> : <Coins />}</span></td>
          <td>{coupon.discount}</td>
          <td>
            <div className="flex items-center space-x-2">
              <Switch id="coupon-active" value={+coupon.isActive} />
            </div>

          </td>
        </tr>
      )}
    />
  );
}
