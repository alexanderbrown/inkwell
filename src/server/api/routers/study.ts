import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Study } from "~/types";

import AESD from "~/server/studies/AESD.json"

const studies = [
  { name: "AESD",
    study: AESD as Study,
}]
export const studyRouter = createTRPCRouter({
  get: publicProcedure
  .input(z.object({ name: z.string().optional() }))
  .query(({ input }) => {
    if (!input.name) return undefined
    return studies.find((study) => study.name === input.name)?.study || undefined;
  }),

  list: publicProcedure
  .query(() => {
    return studies
  }),
});
