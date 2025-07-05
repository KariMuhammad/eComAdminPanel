import {
  fetchCustomers,
  type CustomerStateType,
} from "@/app/redux/features/customers";
import type { AppDispatch, RootState } from "@/app/redux/store";
import useAuth from "@/hooks/use-auth";
import ListPage from "@/layouts/page-list";
import { getUsername } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CustomersList() {
  const { user } = useAuth();

  const { customers } = useSelector<RootState, CustomerStateType>(
    (state) => state.customers
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCustomers(user!.token));
  }, []);

  return (
    <div className="h-screen overflow-y-auto">
      <ListPage
        columns={["No", "Username", "Email", "Mobile", "Role", "Actions"]}
        title="Customers"
        data={customers}
        renderRow={(row, index) => (
          <tr key={index}>
            <td className="p-4">{index}</td>
            <td className="p-4">
              {getUsername(row.first_name, row.last_name)}
            </td>
            <td className="p-4">{row.email}</td>
            <td className="p-4">{row.mobile}</td>
            <td className="p-4">User</td>
            <td className="p-4">
              <button className="text-blue-500 hover:underline">View</button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
