import { z } from "zod";

import {
  createTRPCRouter,
  privateAdminProcedure,
  privateUserProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany();
    return products;
  }),
  getProductById: privateUserProcedure
    .input(z.string().regex(/^[a-zA-Z0-9]{25}$/))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: {
          id: input,
        },
      });
      return product;
    }),
  deleteProductById: privateAdminProcedure
    .input(z.string().regex(/^[a-zA-Z0-9]{25}$/))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.delete({
        where: {
          id: input,
        },
      });
      return product;
    }),
  createProduct: privateAdminProcedure
    .input(
      z.object({
        options: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        catSlug: z.string(),
        img: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.create({
        data: {
          title: input.title,
          options: input.options,
          desc: input.description,
          price: input.price,
          catSlug: input.catSlug,
          img: input.img,
        },
      });
      return product;
    }),
});
