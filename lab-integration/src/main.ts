import { DateTime } from 'luxon';

import { promises as fs, watch } from "fs";
import path from "path";
import { TestsResult } from "./types";

const filePath = path.join(process.cwd(), "../test-results.json");

(async () => {
  console.info("SCRIPT IS RUNNING...");

  const stringifiedDataset = await fs.readFile(filePath, "utf8");
  const dataset = JSON.parse(stringifiedDataset) as TestsResult[];
  let lastTestResultDate: DateTime = getLastTestsResulstDate(dataset);

  watch(filePath, (eventType) => {
    if (eventType === "change") {
      const newTestsResults = dataset.filter(
        (testResult) => {
          console.info(convertToDate(testResult.Data), lastTestResultDate)
          console.info(convertToDate(testResult.Data) > lastTestResultDate)
         return convertToDate(testResult.Data).diff(lastTestResultDate).milliseconds > 0;
        }
      );
      lastTestResultDate = getLastTestsResulstDate(newTestsResults, lastTestResultDate);

      console.info(newTestsResults);
      console.info(lastTestResultDate);
    }
  });
})();

function getLastTestsResulstDate(dataset: TestsResult[], lastTestResultDate?: DateTime): DateTime {
  if(dataset.length === 0)
    return lastTestResultDate || DateTime.now();

  const orderedNewTestsResults = dataset.sort(
    (a, b) => {
      const dateA = convertToDate(a.Data);
      const dateB = convertToDate(b.Data);
      return dateA.diff(dateB).milliseconds;
    });

    console.info(convertToDate(
    orderedNewTestsResults[orderedNewTestsResults.length - 1].Data,
  ))


  return convertToDate(
    orderedNewTestsResults[orderedNewTestsResults.length - 1].Data,
  );
}

function convertToDate(date: string): DateTime {
  return DateTime.fromFormat(date, 'dd/LL/yyyy, HH:mm:ss', { locale: 'pt-BR' });
}
