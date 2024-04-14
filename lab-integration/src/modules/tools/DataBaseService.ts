import { promises as fs } from "fs";
import path from "path";
import { TestEntity } from "../types";

export class DataBaseService {
  private readonly filePath = path.join(process.cwd(), "../database.json");
  private data: TestEntity[] = []

  async find(): Promise<TestEntity[]> {
    const results = await fs.readFile(this.filePath, "utf8");
    return JSON.parse(results);
  }

  isDBUpdated(newData: TestEntity[]): boolean {
    const flag = this.data.length !== newData.length;
    this.data = newData;
    return flag;
  }
}
