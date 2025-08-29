type User = {
  id: number;
  firstName: string;
  lastName: string;
  participationPercentage: number;
};

type Props = {
  data: User[];
};

export default function DataTable({ data }: Props) {
  return (
    <div className="overflow-x-auto w-full mx-auto shadow-lg rounded-lg bg-white">
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-center font-semibold text-gray-700">
              S.No
            </th>
            <th className="py-3 px-4 border-b text-center font-semibold text-gray-700">
              First name
            </th>
            <th className="py-3 px-4 border-b text-center font-semibold text-gray-700">
              Last name
            </th>
            <th className="py-3 px-4 border-b text-center font-semibold text-gray-700">
              Participation
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, i) => (
              <tr key={row.id} className="even:bg-gray-50">
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
  );
}
