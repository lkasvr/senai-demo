import puppeteer, { Browser, Page } from "puppeteer";
import { ITestsResult } from "../types";

export default class FulfillmentAutomation {
  private _browser: Browser | undefined;
  private _page: Page | undefined;
  private _url = "http://localhost:3000/submission";

  private machines = new Map<string, string>([
    ["5534", "1 - Prensa PRE-01"],
    ["5533", "2 - Prensa PRE-02"],
    ["5532", "3 - Prensa PRE-03"],
  ]);

  async init() {
    this._browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    this._page = await this._browser.newPage();
    return this;
  }

  async registerTestResult(testResult: ITestsResult) {
    if (!this._page) throw new Error("Page not initialized");
    await this._page.goto(this._url);
    await this.setCodeBar(testResult.Id_do_Corpo_de_Prova);
    await this.setMachineId(testResult.Id_da_Maquina);
    await this.setForce(testResult.Forca);
    return this;
  }

  private async setCodeBar(codeBar: string) {
    if (!this._page) throw new Error("Page not initialized");
    await this._page.type("#testBodyId", codeBar);

    await this._page.click("#searchButton");
  }

  private async setMachineId(machineId: string) {
    if (!this._page) throw new Error("Page not initialized");
    const machineOpt = this.machines.get(machineId);
    await this._page.select("select#machineId", machineOpt!);
  }

  private async setForce(force: string) {
    if (!this._page) throw new Error("Page not initialized");
    await this._page.type("#force", force);
    await this._page.click("#submitTestButton");
  }

  async closeBrowser() {
    await this._browser?.close();
  }
}
