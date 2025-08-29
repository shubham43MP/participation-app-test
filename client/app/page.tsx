import PieChart from "@/components/Chart";
import DataTable from "@/components/Table";
import UserForm from "@/components/UserForm";
import { getUsers } from "@/services/userService";

const data = [
  { firstName: "Carlos", lastName: "Moura", participation: "5%" },
  { firstName: "Fernanda", lastName: "Oliveira", participation: "15%" },
  { firstName: "Hugo", lastName: "Silva", participation: "20%" },
  { firstName: "Eliza", lastName: "Souza", participation: "20%" },
  { firstName: "Anderson", lastName: "Santos", participation: "40%" },
];

export default async function Home() {
  const users = await getUsers();
  console.log(users);
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-cyan-500 p-8">
        <UserForm />
      </section>
      <section className="max-w-3/4 mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">DATA</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex flex-col flex-wrap md:flex-row w-full items-center justify-around md:gap-16 gap-8 mt-12">
          <div className="flex-1 w-full">
            <DataTable data={users.data} />
          </div>
          <div className="flex-1 w-full">
            <PieChart data={users.data} />
          </div>
        </div>
      </section>
    </main>
  );
}
