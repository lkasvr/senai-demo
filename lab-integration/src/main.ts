import { WatchEventType, promises as fs, watch } from "fs";
import * as lockfile from "proper-lockfile";
import path from "path";
import { queue } from "async";
import puppeteer from "puppeteer";

import { DateTime } from "luxon";
import { TestsResult } from "./types";

const filePath = path.join(process.cwd(), "../test-results.json");

const machines = new Map<string, string>([
  ["5534", "1 - Prensa PRE-01"],
  ["5533", "2 - Prensa PRE-02"],
  ["5532", "3 - Prensa PRE-03"],
]);

(async () => {
  console.info("SCRIPT IS RUNNING...");

  let lastTestResultDate = DateTime.now();

  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.setViewport({ width: 720, height: 720 });
  await page.goto("http://localhost:3000/submission");

  const queueTask = queue(
    async (task: { eventType: WatchEventType }, callback) => {
      try {
        if (task.eventType === "change") {
          await lockfile.lock(filePath);
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

          const newTestsResults = dataset.filter(
            (testResult) =>
              testResult.Data.diff(lastTestResultDate).milliseconds > 0,
          );
          if (newTestsResults.length > 0) {
            lastTestResultDate = dataset.sort(
              (a, b) => b.Data.diff(a.Data).milliseconds,
            )[0].Data as DateTime<true>;

            for (const testResult of newTestsResults) {
              await page.type("#testBodyId", testResult.Id_do_Corpo_de_Prova);
              await page.click("button#search");

              await page.waitForSelector("select#machineId");
              await page.select(
                "select#machineId",
                machines.get(testResult.Id_da_Maquina) ?? "",
              );

              await page.waitForSelector("button#submit");
              await page.type(
                "#force",
                parseFloat(testResult.Forca).toFixed(2),
              );
              await page.click("button#submit");

              await page.waitForSelector("button#search");
            }
          }
        }
      } finally {
        await lockfile.unlock(filePath);
      }

      callback();
    },
    1,
  );

  watch(filePath, async (eventType) => queueTask.push({ eventType }));
})();
