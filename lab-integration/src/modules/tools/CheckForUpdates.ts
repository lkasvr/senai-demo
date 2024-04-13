import { testsResult } from "../types";

export default class CheckForUpdates {

  private testsResult: testsResult[] = [];

  constructor(data: testsResult[]) {
    this.testsResult = data;
  }

  checkForUpdatesOnFile(testsResult: testsResult[]): boolean {
    const actualData = testsResult;

    console.log(this.testsResult.length !== actualData.length);
    console.log(this.testsResult.length);
    console.log(actualData.length);
    const flag = this.testsResult.length !== actualData.length;
    this.testsResult = actualData;


    return flag;
  }
}
