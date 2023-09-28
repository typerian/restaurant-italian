import { api } from "@/utils/api";
import type { FormEvent } from "react";
import { toast } from "react-toastify";

const AdminTableOrder = () => {
  const { isLoading, data } = api.orderRouter.getAllOrder.useQuery();
  const context = api.useContext();
  const { mutate } = api.orderRouter.updateOrder.useMutation({
    onSuccess() {
      void context.orderRouter.getAllOrder.invalidate();
      toast.success("El estado de la orden ha sido cambiado");
    },
  });

  if (isLoading) {
    return <p>Esta cargando...</p>;
  }

  function handleUpdate(e: FormEvent<HTMLFormElement>, id: string): void {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutate({ status, id });
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
            <tr
              key={order.id}
              className={`${order.status !== "delivered" && "bg-red-50"}`}
            >
              <td className="hidden px-1 py-6 md:block">{order.id}</td>
              <td className="px-1 py-6 ">{order.createdAt.toDateString()}</td>
              <td className="px-1 py-6 ">
                {parseFloat(order.price.toString())}
              </td>
              <td className="hidden px-1 py-6 md:block">
                {JSON.parse(order.products)[0].title as string}
              </td>
              <td className="px-1 py-6 ">
                <form
                  className="flex items-center justify-center gap-4"
                  onSubmit={(e) => handleUpdate(e, order.id)}
                >
                  <input
                    placeholder={order.status}
                    className="rounded-md p-2 ring-1 ring-red-100"
                  />
                  <button className="rounded-full bg-yellow-200 p-2">✏</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTableOrder;
