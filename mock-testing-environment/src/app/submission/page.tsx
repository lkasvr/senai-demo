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

    console.log("here");
    return `Teste de ruptura do corpo ${testBodyId} na máquina ${machineId} com carga de ${force} kN salvo com sucesso!`;
  };

  return <ResultSubmission onSubmit={handleSubmit} />;
}
