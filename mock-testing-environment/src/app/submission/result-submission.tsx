"use client";

import { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function ResultSubmission({
  onSubmit,
}: {
  onSubmit: (arg: {
    testBodyId: string;
    machineId: string;
    force: string;
  }) => Promise<string>;
}) {
  const [testBodyId, setTestBodyId] = useState("");
  const [machineId, setMachineId] = useState("");
  const [force, setForce] = useState("");
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await onSubmit({ testBodyId, machineId, force });
    setResponse(response);
    setTestBodyId("");
    setMachineId("");
    setForce("");
    setShowAdditionalInputs(false);
  };

  return (
    <div>
      <DocumentTextIcon className="h-6 w-6 text-orange-500" />
      <p>Ensaio de ruptura</p>
      <p>Formulário de ensaio de ruptura</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="testBodyId">Código de barras:</label>
        <input
          type="text"
          id="testBodyId"
          name="testBodyId"
          value={testBodyId}
          required
          onChange={(e) => setTestBodyId(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowAdditionalInputs(true)}
          disabled={!testBodyId}
        >
          Pesquisar
        </button>
        {showAdditionalInputs && (
          <>
            <label htmlFor="machineId">Máquina de ensaio utilizada:</label>
            <select
              name="machineId"
              id="machineId"
              required
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="1 - Prensa PRE-01">1 - Prensa PRE-01</option>
              <option value="2 - Prensa PRE-02">2 - Prensa PRE-02</option>
              <option value="3 - Prensa PRE-03">3 - Prensa PRE-03</option>
            </select>
            <label htmlFor="force">Carga:</label>
            <input
              type="text"
              id="force"
              name="force"
              required
              value={force}
              onChange={(e) => setForce(e.target.value)}
            />
            <button type="submit">Salvar</button>
          </>
        )}
        <p>{response}</p>
      </form>
    </div>
  );
}
