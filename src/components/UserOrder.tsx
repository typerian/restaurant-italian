import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";

const UserTableOrder = () => {
  const { userId } = useAuth();
  const { isLoading, data } = api.orderRouter.getAllOrderByUser.useQuery(
    userId!,
  );

  if (isLoading) {
    return <p>Esta cargando...</p>;
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">ID Orden</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th className="hidden md:block">Productos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((order) => (
            <tr key={order.id} className="bg-red-50 text-sm md:text-base">
              <td className="hidden px-1 py-6 md:block">{order.id}</td>
              <td className="px-1 py-6 ">{order.createdAt.toDateString()}</td>
              <td className="px-1 py-6 ">
                {parseFloat(order.price.toString())}
              </td>
              <td className="hidden px-1 py-6 md:block">
                Big burger (2), Veggie Pizza (2), Coca-Cola 1L (1)
              </td>
              <td className="px-1 py-6 ">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableOrder;
