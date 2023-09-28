import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useUserRole = () => {
  const [role, setRole] = useState<"admin" | "basic_member" | "guest_member">(
    "basic_member",
  );

  const { user } = useUser();

  useEffect(() => {
    const getRole = async () => {
      const info = await user?.getOrganizationMemberships();
      if (info) {
        setRole(info[0]?.role ?? "basic_member");
      }
    };

    if (user) {
      void getRole();
    }
  }, [user]);

  return { role, userId: user?.id };
};
