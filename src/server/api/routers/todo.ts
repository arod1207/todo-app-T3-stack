import { prisma } from "./../../db";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),
  addTask: publicProcedure
    .input(z.string({ required_error: "Cannot be empty" }).min(1).max(40))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.todo.create({
        data: {
          text: input,
        },
      });
      return task;
    }),
  deleteTask: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });
      return deleted;
    }),
});
