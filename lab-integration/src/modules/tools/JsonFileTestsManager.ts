import { promises as fs } from 'fs';
import path from 'path';
import { testsResult } from '../types';

export default class JsonFileTestsManager {
  private readonly filePath = path.join(process.cwd(), '../test-results.json');
  private dataset: testsResult[] = [];

  constructor(firstDataset: testsResult[]) {
    this.dataset = firstDataset;
  }

  async readJsonTestsResultFile(): Promise<testsResult[]> {
    const results = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(results);
  }

  async writeJsonTestFile(newTestsResults: testsResult): Promise<void> {
    const lastDataset = await this.readJsonTestsResultFile();
    const updatedFileContents = JSON.stringify(
      [...lastDataset, newTestsResults],
      null,
      2,
    );
    await fs.writeFile(this.filePath, updatedFileContents);
  }

  isTestsResultsFileUpdated(newDataset: testsResult[]): boolean {
    const flag = this.dataset.length !== newDataset.length;
    this.dataset = newDataset;
    return flag;
  }
}
