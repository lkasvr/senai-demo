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
      <section>
        <div className="flex flex-row items-center space-x-4 mb-4">
          <DocumentTextIcon className="h-6 w-6 text-orange-500" />
          <p className="text-xl font-bold">Ensaio de ruptura</p>
        </div>
        <p className="text-lg mb-4">Formulário de ensaio de ruptura</p>
      </section>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="testBodyId"
          className="block text-sm font-medium text-gray-700"
        >
          Código de barras:
        </label>
        <input
          type="text"
          id="testBodyId"
          name="testBodyId"
          value={testBodyId}
          required
          onChange={(e) => setTestBodyId(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={() => {
            setShowAdditionalInputs(true);
            setResponse("");
          }}
          disabled={!testBodyId}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Pesquisar
        </button>
        {showAdditionalInputs && (
          <>
            <label
              htmlFor="machineId"
              className="block text-sm font-medium text-gray-700"
            >
              Máquina de ensaio utilizada:
            </label>
            <select
              name="machineId"
              id="machineId"
              required
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="1 - Prensa PRE-01">1 - Prensa PRE-01</option>
              <option value="2 - Prensa PRE-02">2 - Prensa PRE-02</option>
              <option value="3 - Prensa PRE-03">3 - Prensa PRE-03</option>
            </select>
            <label
              htmlFor="force"
              className="block text-sm font-medium text-gray-700"
            >
              Carga:
            </label>
            <input
              type="text"
              id="force"
              name="force"
              required
              value={force}
              onChange={(e) => setForce(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Salvar
            </button>
          </>
        )}
        <p className="w-96 mt-4 text-green-600">{response}</p>
      </form>
    </div>
  );
}
