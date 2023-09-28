import { z } from "zod";

import {
  createTRPCRouter,
  privateUserProcedure,
  privateAdminProcedure,
} from "@/server/api/trpc";

export const orderRouter = createTRPCRouter({
  getAllOrderByUser: privateUserProcedure
    .input(z.string().regex(/user[-_a-zA-Z0-9]{10}/))
    .query(async ({ input, ctx }) => {
      const order = await ctx.db.order.findMany({
        where: {
          userId: input,
        },
      });
      return order;
    }),
  getAllOrder: privateAdminProcedure.query(async ({ ctx }) => {
    const order = await ctx.db.order.findMany();
    return order;
  }),
  updateOrder: privateAdminProcedure
    .input(
      z.object({
        id: z.string().regex(/^[a-zA-Z0-9]{25}$/),
        status: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const order = await ctx.db.order.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
      return order;
    }),
});
