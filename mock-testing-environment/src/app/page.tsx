import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link
        href="/ct310"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Run the test
      </Link>
      <Link
        href="/submission"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit the test result
      </Link>
    </>
  );
}
