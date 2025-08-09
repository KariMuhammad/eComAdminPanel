import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DiscountType, type Coupon } from "@/types";
import { DatePicker } from "@/components/ui/DatePicker";

import useAuth from "@/hooks/use-auth";
import { useCreateCouponMutation, useGetCouponByIdQuery } from "@/app/redux/features/coupons";

type AddCouponProps = {
  mode?: "create" | "edit";
}

export default function AddCoupon({ mode = "create" }: AddCouponProps) {
  useAuth();

  const [coupon, setCoupon] = useState<Omit<Coupon, "_id" | "usageCount">>({
    code: "",
    discountType: DiscountType.PERCENTAGE,
    discount: 0,
    usageLimit: 0,
    expiredAt: new Date(),
    isActive: false
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: currentCoupon } = useGetCouponByIdQuery({ _id: id! }, { skip: !id }); // skip call if id is undefined
  const [createCoupon] = useCreateCouponMutation();

  console.log("Id", id, "Current Coupon", currentCoupon)

  const handleCouponState = <K extends keyof Coupon>(key: K, value: Coupon[K]) => {
    setCoupon((p) => ({ ...p, [key]: value }))
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "create") {
      createCoupon(coupon).then((data) => {
        toast.success("Successfully Created Coupon");
        navigate("/coupons")
      }).catch(error => {
        toast.error("Failed to create Coupon!", error)
      })
    }

    if (mode === "edit") {
      // updateCoupon
    }

    console.log(coupon)
  }

  useEffect(() => {
    if (mode === "edit" && id && currentCoupon) {
      console.log("Current Coupon", currentCoupon)
      setCoupon(currentCoupon);
    } else {
      console.log("Hey hey")
    }
  }, [id, currentCoupon])

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{mode === "create" ? "Create" : "Edit"} New Coupon</h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="coupon-code" className="block text-lg font-medium text-gray-700">
            Coupon Code
          </Label>

          <Input
            name="coupon-code"
            id="coupon-code"
            value={coupon.code}
            type="text"
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Enter Coupon Code"
            onChange={(e) => handleCouponState("code", e.target.value.toUpperCase())}
          />
        </div>
        {/* ./coupon code input */}
        <div className="flex items-center">
          <div className="flex-1">
            <Label htmlFor="coupon-discount-type" className="block text-lg font-medium text-gray-700">
              Coupon Discount Type
            </Label>

            <select
              name="coupon-discount-type"
              value={coupon.discountType}
              className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
              onChange={(e) => handleCouponState("discountType", e.target.value as DiscountType)}
            >
              <option value={DiscountType.FIXED}>Fixed</option>
              <option value={DiscountType.PERCENTAGE}>Percentage</option>
            </select>

          </div>
          {/* ./coupon discount type input */}
          <div className="flex-1">
            <Label htmlFor="coupon-discount" className="block text-lg font-medium text-gray-700">
              Coupon Discount
            </Label>

            <input
              name="coupon-discount"
              type="number"
              {...coupon.discountType === DiscountType.PERCENTAGE ? {
                min: 0,
                max: 100
              } : {}}
              value={coupon.discount}
              className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
              onChange={(e) => handleCouponState("discount", +e.target.value)}
            />

          </div>
          {/* ./coupon discount value input */}
          <div className="flex-1">
            <Label htmlFor="coupon-usage-limit" className="block text-lg font-medium text-gray-700">
              Usage Limit
            </Label>

            <input
              name="coupon-usage-limit"
              type="number"
              value={coupon.usageLimit}
              className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
              onChange={(e) => handleCouponState("usageLimit", +e.target.value)}
            />

          </div>
          {/* ./coupon discount usage limit input */}
        </div>

        <div>
          <Label>Expire At</Label>
          {/* <input type="date" name="expireAt" value={coupon.expireAt} onChange={(e) => handleCouponState("expireAt", e.target.value)} /> */}

          <DatePicker value={new Date(coupon.expiredAt)} onChange={(value) => handleCouponState("expiredAt", value ? new Date(value) : new Date())} />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {mode === "create" ? "Add" : "Update"} Brand
        </button>
      </form>
    </div>
  );
}
