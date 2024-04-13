"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { action } from "./actions";

export default function ResultSubmission() {
  const [state, formAction] = useFormState(action, null);
  const [testBodyId, setTestBodyId] = useState("");
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

  return (
    <div>
      <DocumentTextIcon className="h-6 w-6 text-orange-500" />
      <p>Ensaio de ruptura</p>
      <p>Formulário de ensaio de ruptura</p>
      <form action={formAction}>
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
          onClick={() => setShowAdditionalInputs(true)}
          disabled={!testBodyId}
        >
          Pesquisar
        </button>
        {showAdditionalInputs && (
          <>
            <label htmlFor="machineId">Máquina de ensaio utilizada:</label>
            <select name="machineId" id="machineId" required>
              <option value="" selected disabled>
                Selecione uma opção
              </option>
              <option value="5534">1 - Prensa PRE-01</option>
              <option value="5535">2 - Prensa PRE-02</option>
              <option value="5536">3 - Prensa PRE-03</option>
            </select>
            <label htmlFor="force">Carga:</label>
            <input type="text" id="force" name="force" required />
            <button type="submit" formAction={formAction}>
              Salvar
            </button>
          </>
        )}
        <p>{state || ""}</p>
      </form>
    </div>
  );
}
