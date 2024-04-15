import { DateTime } from "luxon";
import { promises as fs, watch } from "fs";
import path from "path";
import { TestsResult } from "./types";

const filePath = path.join(process.cwd(), "../test-results.json");

(async () => {
  console.info("SCRIPT IS RUNNING...");

  let lastTestResultDate = DateTime.now();

  watch(filePath, async (eventType) => {
    const stringifiedDataset = await fs.readFile(filePath, "utf8");
    const parsedDataset = JSON.parse(stringifiedDataset) as TestsResult[];
    const dataset = parsedDataset
      .map((testResult) => {
        const Data = DateTime.fromFormat(
          testResult.Data,
          "dd/LL/yyyy, HH:mm:ss",
          { locale: "pt-BR" },
        );

        return {
          ...testResult,
          Data,
        };
      })
      .filter((testResult) => testResult.Data.isValid);

    if (eventType === "change") {
      const newTestsResults = dataset.filter(
        (testResult) =>
          testResult.Data.diff(lastTestResultDate).milliseconds > 0,
      );

      if (newTestsResults.length > 0) {
        lastTestResultDate = dataset.sort(
          (a, b) => b.Data.diff(a.Data).milliseconds,
        )[0].Data as unknown as DateTime<true>;
      }

      console.info(newTestsResults);
      console.info(lastTestResultDate);
    }
  });
})();
