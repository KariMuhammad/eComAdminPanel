import {
  fetchCustomers,
  updateCustomer,
  type CustomerStateType,
} from "@/app/redux/features/customers";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { Switch } from "@/components/ui/switch";
import useAuth from "@/hooks/use-auth";
import ListPage from "@/layouts/page-list";
import { getUsername } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CustomersList() {
  const { user: { token } } = useAuth();

  const { customers } = useSelector<RootState, CustomerStateType>(
    (state) => state.customers
  );

  const handleActivityOfUser = (id: string, updatedData: any, token: string) => dispatch(updateCustomer({ id, updatedData, token }));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCustomers(token));
  }, []);

  console.log(customers)

  return (
    <div className="h-screen overflow-y-auto">
      <ListPage
        columns={["No", "Username", "Email", "Mobile", "Role", "Status", "Actions"]}
        title="Customers"
        data={customers || []}
        renderRow={(row, index) => (
          <tr key={index}>
            <td className="p-4">{index}</td>
            <td className="p-4">
              {getUsername(row.first_name, row.last_name)}
            </td>
            <td className="p-4">{row.email}</td>
            <td className="p-4">{row.mobile}</td>
            <td className="p-4">{row.role.toUpperCase()}</td>
            <td className="h-full">
              <div className="h-full">
                <Switch className="" id="coupon-active" checked={row.status} onCheckedChange={(status) => handleActivityOfUser(row._id, { status }, token)} />
              </div>
            </td>
            <td className="p-4">
              <button className="text-blue-500 hover:underline">View</button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
