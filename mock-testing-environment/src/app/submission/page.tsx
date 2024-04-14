import { promises as fs } from "fs";
import path from "path";
import ResultSubmission from "./result-submission";

export default function Page() {
  const handleSubmit = async ({
    testBodyId,
    machineId,
    force,
  }: {
    testBodyId: string;
    machineId: string;
    force: string;
  }) => {
    "use server";

    const filePath = path.join(process.cwd(), "../database.json");
    const stringifiedDatabase = await fs.readFile(filePath, "utf8");
    const database = JSON.parse(stringifiedDatabase);

    const newResult = {
      Id_do_Corpo_de_Prova: testBodyId,
      Nome_da_Maquina: machineId,
      Forca: force,
      Unidade_de_forca: "kN",
    };

    database.push(newResult);

    await fs.writeFile(filePath, JSON.stringify(database, null, 2), "utf8");

    return `Teste de ruptura do corpo ${testBodyId} na máquina ${machineId} com carga de ${force} kN salvo com sucesso!`;
  };

  return <ResultSubmission onSubmit={handleSubmit} />;
}
