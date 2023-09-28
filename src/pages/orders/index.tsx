import AdminTableOrder from "@/components/AdminOrder";
import UserTableOrder from "@/components/UserOrder";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@clerk/nextjs";

const OrdersPage = () => {
  const { isSignedIn } = useAuth();

  const { role } = useUserRole();

  if (!isSignedIn) {
    return <p>Esta cargando...</p>;
  }

  return <>{role === "admin" ? <AdminTableOrder /> : <UserTableOrder />}</>;
};

export default OrdersPage;
