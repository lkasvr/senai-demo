"use client";

import { useState } from "react";

export default function TestButton({
  runTest,
}: {
  runTest: () => Promise<string>;
}) {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const result = await runTest();
    setMessage(result);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Run CT310 Compression Test
      </button>
      <p>{message}</p>
    </>
  );
}
