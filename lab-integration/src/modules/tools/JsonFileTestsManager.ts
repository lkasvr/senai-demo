import { promises as fs } from "fs";
import path from "path";
import { ITestsResult } from "../types";

export default class JsonFileTestsManager {
  private readonly filePath = path.join(process.cwd(), "../test-results.json");
  private dataset: ITestsResult[] = [];
  private lastTestResult!: ITestsResult;

  constructor(firstDataset: ITestsResult[]) {
    this.setDataset(firstDataset);
  }

  async readJsonTestsResultFile(): Promise<ITestsResult[]> {
    const results = await fs.readFile(this.filePath, "utf8");
    return JSON.parse(results);
  }

  async writeJsonTestFile(newTestsResults: ITestsResult): Promise<void> {
    const lastDataset = await this.readJsonTestsResultFile();
    const updatedFileContents = JSON.stringify(
      [...lastDataset, newTestsResults],
      null,
      2,
    );
    await fs.writeFile(this.filePath, updatedFileContents);
  }

  isTestsResultsFileUpdated(newDataset: ITestsResult[]): boolean {
    const mostRecentTest = newDataset.reduce((a, b) =>
      this.convertToDate(a.Data) > this.convertToDate(b.Data) ? a : b,
    );

    if (
      this.convertToDate(mostRecentTest.Data) >
      this.convertToDate(this.lastTestResult.Data)
    )
      return true;

    return false;
  }

  getLastTestResult(): ITestsResult {
    return this.lastTestResult;
  }

  setDataset(newDataset: ITestsResult[]): void {
    this.dataset = newDataset;
    this.lastTestResult = this.dataset.reduce((a, b) =>
      this.convertToDate(a.Data) > this.convertToDate(b.Data) ? a : b,
    );
  }

  private convertToDate(date: string): Date {
    const [day, month, rest] = date.split("/");
    const [year, time] = rest.split(" ");
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
}
