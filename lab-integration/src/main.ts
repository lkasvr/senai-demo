import { promises as fs, watch } from "fs";
import * as lockfile from "proper-lockfile";
import path from "path";
import fastq from "fastq";
import puppeteer from "puppeteer";
import { DateTime } from "luxon";
import { Machines, TestsResult } from "./types";

const filePath = path.join(process.cwd(), "../test-results.json");

const machines: Machines = {
  5534: "1 - Prensa PRE-01",
  5533: "2 - Prensa PRE-02",
  5532: "3 - Prensa PRE-03",
};

(async () => {
  console.info("SCRIPT IS RUNNING...");

  let lastTestResultDate = DateTime.now();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 720, height: 720 });
  await page.goto("http://localhost:3000/submission");

  const queue = fastq.promise(async () => {
    try {
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
        lastTestResultDate = newTestsResults.sort(
          (a, b) => b.Data.diff(a.Data).milliseconds,
        )[0].Data as DateTime<true>;

        for (const testResult of newTestsResults) {
          await page.type("#testBodyId", testResult.Id_do_Corpo_de_Prova);
          await page.click("button#search");

          await page.waitForSelector("select#machineId");
          await page.select(
            "select#machineId",
            machines[testResult.Id_da_Maquina],
          );

          await page.type("#force", parseFloat(testResult.Forca).toFixed(2));

          await page.click("button#submit");
        }
      }
    } finally {
      await lockfile.unlock(filePath);
    }
  }, 1);

  watch(filePath, (eventType) => eventType === "change" && queue.push({}));
})();
