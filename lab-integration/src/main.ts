import { promises as fs, watch } from "fs";
import path from "path";
import { ITestsResult } from "./types";

const filePath = path.join(process.cwd(), "../test-results.json");


(async () => {
  console.info('SCRIPT IS RUNNING...');

  const stringifiedDataset = await fs.readFile(filePath, "utf8");
  const dataset = JSON.parse(stringifiedDataset) as  ITestsResult[];
  let lastTestResultDate: Date = getLastTestsResulstDate(dataset);

  watch(filePath, (eventType) => {
    if (eventType === "change") {

      const newTestsResults = dataset.filter((testResult) => convertToDate(testResult.Data) > lastTestResultDate);

      if(newTestsResults.length > 0)
        lastTestResultDate = getLastTestsResulstDate(dataset);

      console.info(lastTestResultDate);
    }
  });
})();

function getLastTestsResulstDate(dataset: ITestsResult[]): Date {
  const orderedNewTestsResults = dataset.sort((a, b) => convertToDate(a.Data).getTime() - convertToDate(b.Data).getTime());
  return convertToDate(orderedNewTestsResults[orderedNewTestsResults.length - 1].Data);
}

function convertToDate(date: string): Date {
    const [day, month, rest] = date.split("/");
    const [year, time] = rest.split(",");
    const [h, m, s] = time.split(":");
    return new Date(
      parseInt(year.trim()),
      parseInt(month),
      parseInt(day),
      parseInt(h),
      parseInt(m),
      parseInt(s),
    );
  }
