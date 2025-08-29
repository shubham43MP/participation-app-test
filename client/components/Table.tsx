import { User } from "@/services/userService";

type DataTableProps = {
  data: User[];
};

const TABLE_HEADERS = ["S.No", "First name", "Last name", "Participation"];

export default function DataTable({ data }: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full mx-auto shadow-lg rounded-lg bg-white p-6 text-center text-gray-500">
        No records available
      </div>
    );
  }

  return (
    <div className="w-full mx-auto shadow-lg rounded-lg bg-white">
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="py-3 px-4 border-b text-center font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4 border-b text-center">{i + 1}</td>
                  <td className="py-3 px-4 border-b text-center">
                    {row.firstName}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {row.lastName}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {row.participationPercentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
