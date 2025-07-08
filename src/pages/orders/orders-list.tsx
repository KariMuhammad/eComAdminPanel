import { fetchOrders, type OrderStateType } from "@/app/redux/features/orders";
import type { AppDispatch, RootState } from "@/app/redux/store";
import useAuth from "@/hooks/use-auth";
import ListPage from "@/layouts/page-list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OrdersList() {
  const { user } = useAuth();
  const { orders } = useSelector<RootState, OrderStateType>(
    (state) => state.orders
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOrders(user!.token));
  }, []);

  console.log("Orders: ", orders);

  return (
    <ListPage
      title="Orders"
      columns={[
        "id",
        "Order ID",
        "Order Date",
        "Customer Info",
        "Total Amount",
        "Order Status",
        "Action",
      ]}
      data={orders}
      renderRow={(order, index) => (
        <tr key={order._id}>
          <td className="text-center">{index}</td>
          <td>{order._id}</td>
          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
          <td>
            {order.orderedBy.first_name} {order.orderedBy.last_name}
            <br />
            <span className="text-sm text-gray-500">
              {order.orderedBy.email}
            </span>
          </td>
          <td>${order.totalPrice.toFixed(2)}</td>
          <td>{order.status}</td>
          <td>
            {/* Action buttons can be added here */}
            <Link
              to={`/orders/${order._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </td>
        </tr>
      )}
    />
  );
}
