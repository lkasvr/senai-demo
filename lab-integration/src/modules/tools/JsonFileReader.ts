import { promises as fs } from 'fs';
import path from 'path';
import { testsResult } from '../types';

export default class JsonFileReader {
  private filePath = path.join(process.cwd(), '../test-results.json');

  async readJsonTestsResultFile(): Promise<testsResult[]> {
    const results = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(results);
  }

  async writeJsonTestFile(data: testsResult): Promise<void> {
    const oldFileContents = await this.readJsonTestsResultFile();
    const updatedFileContents = JSON.stringify([...oldFileContents, data], null, 2);

    await fs.writeFile(this.filePath, updatedFileContents);
  }
}
