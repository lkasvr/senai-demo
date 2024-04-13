import { promises as fs } from "fs";
import path from "path";
import TestButton from "./test-button";

export default function Page() {
  const runTest = async () => {
    "use server";

    const filePath = path.join(process.cwd(), "../test-results.json");
    const stringifiedData = await fs.readFile(filePath, "utf8");
    const testResults = JSON.parse(stringifiedData);

    const lastTestResult = testResults[testResults.length - 1];

    const newTestId = (Number(lastTestResult.Id_do_Teste) + 1).toString();
    const newTestBodyId = Math.floor(Math.random() * 90000 + 10000).toString();
    const newDate = new Date().toLocaleString("pt-BR");
    const newForce = (Math.random() * 100 + 100).toFixed(4) + " kN";

    const newTestResult = {
      ...lastTestResult,
      Id_do_Teste: newTestId.toString(),
      Id_do_Corpo_de_Prova: newTestBodyId,
      Data: newDate,
      Forca: newForce,
    };

    testResults.push(newTestResult);

    await fs.writeFile(filePath, JSON.stringify(testResults, null, 2), "utf8");

    return `Test ID: ${newTestBodyId}, Date: ${newDate}, Force: ${newForce}`;
  };

  return <TestButton runTest={runTest} />;
}
