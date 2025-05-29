import { readdirSync, readFileSync } from "fs";
import { basename } from "path";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Study } from "~/types";


function loadStudy(filePath: string): Study {
  const fileContent = readFileSync(filePath, "utf-8");
  const study = JSON.parse(fileContent);
  return study as Study;
}

const STUDY_BASE_PATH = "src/server/studies";
const STUDY_FILE_EXTENSION = "json";

export const studyRouter = createTRPCRouter({
  get: publicProcedure
  .input(z.object({ name: z.string().optional() }))
  .query(async ({ input }) => {
    if (!input.name) return undefined
    const filePath = `${STUDY_BASE_PATH}/${input.name}.${STUDY_FILE_EXTENSION}`;
    const study = loadStudy(filePath);
    return study;
  }),

  list: publicProcedure
  .query(async () => {
    const files = readdirSync(STUDY_BASE_PATH);
    const studies = files
      .filter((file) => file.endsWith(`.${STUDY_FILE_EXTENSION}`))
      .map((file) => basename(file, `.${STUDY_FILE_EXTENSION}`));

    let studyDescriptions: {name: string, study?: Study}[] = []
    for (const studyName of studies) {
      const filePath = `${STUDY_BASE_PATH}/${studyName}.${STUDY_FILE_EXTENSION}`;
      const study = loadStudy(filePath);
      if (study) {
        studyDescriptions.push({
          name: studyName,
          study
        });
      }
      else {
        studyDescriptions.push({
          name: studyName,
          study: undefined
        });
      }
    }
    return studyDescriptions;
  }),
});
