import { Link } from "react-router-dom";
import ListPage from "@/layouts/page-list";
import { DiscountType, ModalSizes } from "@/types";
import { Coins, PercentCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import useAuth from "@/hooks/use-auth";
import { useDeleteCouponMutation, useGetCouponsQuery, useUpdateCouponMutation } from "@/app/redux/features/coupons";
import { useModal } from "@/hooks/useModal";
import { DeleteModal } from "@/components/modal-templates/DeleteModal";

export default function CouponList() {
  useAuth();

  const { openModal } = useModal();

  const { data: coupons } = useGetCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const handleDelete = (id: string) => {
    openModal({
      title: "You want to delete this coupon?",
      children: <DeleteModal onConfirm={() => deleteCoupon({ _id: id })} />,
      size: ModalSizes.md
    })
  }

  const handleActivityOfCoupon = (id: string, value: boolean) => {
    updateCoupon({ id, coupon: { isActive: value } })
  }

  console.log("coupons", coupons);

  return (
    <ListPage
      title="Coupons"
      buttonLabel="Add Coupon"
      buttonUrl="/coupons/add"
      columns={["id", "Code", "Discount Type", "Discount", "End at", "Active", "Actions"]}
      data={coupons || []}
      renderRow={(coupon, index) => (
        <tr key={index} className="text-center">
          <td>{index}</td>
          <td>{coupon.code}</td>
          <td className="p-3"><span className="block w-fit mx-auto">{coupon.discountType === DiscountType.PERCENTAGE ? <PercentCircle className="w-7 h-7" /> : <Coins />}</span></td>
          <td>{coupon.discount}</td>
          <td>{new Date(coupon.expiredAt).toLocaleString("en-us", { dateStyle: "medium", timeStyle: "short" })}</td>
          <td>
            <div className="flex items-center space-x-2">
              <Switch className="" id="coupon-active" checked={coupon.isActive} onCheckedChange={(status) => handleActivityOfCoupon(coupon._id, status)} />
            </div>
          </td>

          <td>
            <td className="px-4 py-2">
              <div className="flex items-center justify-center">
                <button className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 mr-2">
                  <Link to={`/coupons/edit/${coupon._id}`}>Edit</Link>
                </button>

                <button
                  className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                  onClick={() => handleDelete(coupon._id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </td>
        </tr>
      )}
    />
  );
}
