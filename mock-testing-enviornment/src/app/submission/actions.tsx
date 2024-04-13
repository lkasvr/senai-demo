"use server";

export async function action(_: string | null, formData: FormData) {
  const testBodyId = formData.get("testBodyId");
  const machineId = formData.get("machineId");
  const force = formData.get("force");

  return `Teste de ruptura do corpo ${testBodyId} na máquina ${machineId} com carga de ${force} kN salvo com sucesso!`;
}
