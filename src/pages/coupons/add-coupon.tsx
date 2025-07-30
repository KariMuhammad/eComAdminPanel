import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/use-auth";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DiscountType } from "@/types";
import { createCoupon } from "@/apis/services/coupon-service";
import { DatePicker } from "@/components/ui/DatePicker";

export default function AddCoupon() {
  const { user } = useAuth();
  const [coupon, setCoupon] = useState({ code: "", discountType: DiscountType.PERCENTAGE, discount: 0, usageLimit: 0, expireAt: new Date() });
  const navigate = useNavigate();
  // const dateRef = useRef(null);

  const handleCouponState = (key: string, value: string) => {
    setCoupon((p) => ({ ...p, [key]: value }))
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCoupon(coupon, user?.token!).then((data) => {
      toast.success("Successfully Created Coupon");
      navigate("/coupons")
    }).catch(error => {
      toast.error("Failed to create Coupon!", error)
    })

    console.log(coupon)
  }

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Coupon</h1>

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
            onChange={(e) => handleCouponState("code", e.target.value)}
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
              onChange={(e) => handleCouponState("discountType", e.target.value)}
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
              onChange={(e) => handleCouponState("discount", e.target.value)}
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
              onChange={(e) => handleCouponState("usageLimit", e.target.value)}
            />

          </div>
          {/* ./coupon discount usage limit input */}
        </div>

        <div>
          <Label>Expire At</Label>
          {/* <input type="date" name="expireAt" value={coupon.expireAt} onChange={(e) => handleCouponState("expireAt", e.target.value)} /> */}

          <DatePicker value={coupon.expireAt} onChange={(value) => handleCouponState("expireAt", value || "")} />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
}
