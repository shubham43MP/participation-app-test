import DataTable from "@/components/Table";

const data = [
  { firstName: "Carlos", lastName: "Moura", participation: "5%" },
  { firstName: "Fernanda", lastName: "Oliveira", participation: "15%" },
  { firstName: "Hugo", lastName: "Silva", participation: "20%" },
  { firstName: "Eliza", lastName: "Souza", participation: "20%" },
  { firstName: "Anderson", lastName: "Santos", participation: "40%" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-cyan-500 p-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="First name"
            className="p-3 rounded-md flex-1 sm:min-w-0 min-w-2/3 bg-white"
          />
          <input
            type="text"
            placeholder="Last name"
            className="p-3 rounded-md flex-1 sm:min-w-0 min-w-2/3 bg-white"
          />
          <input
            type="text"
            placeholder="Participation"
            className="p-3 rounded-md flex-1 sm:min-w-0 min-w-2/3 bg-white"
          />
          <button className="px-6 py-3 sm:w-1/7 w-1/3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-cyan-500 transition">
            SEND
          </button>
        </div>
      </section>
      <section className="max-w-4xl mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">DATA</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <DataTable />
      </section>
    </main>
  );
}
