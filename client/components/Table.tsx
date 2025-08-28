import React from "react";

const columns = [
  { Header: "First name", accessor: "firstName" },
  { Header: "Last name", accessor: "lastName" },
  { Header: "Participation", accessor: "participation" },
];

const data = [
  { firstName: "Carlos", lastName: "Moura", participation: "5%" },
  { firstName: "Fernanda", lastName: "Oliveira", participation: "15%" },
  { firstName: "Hugo", lastName: "Silva", participation: "20%" },
  { firstName: "Eliza", lastName: "Souza", participation: "20%" },
  { firstName: "Anderson", lastName: "Santos", participation: "40%" },
];

export default function DataTable() {
  return (
    <div className="overflow-x-auto w-full max-w-lg mx-auto shadow-lg rounded-lg bg-white">
      <table className="min-w-full border border-gray-200">
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
          {data.map((row, i) => (
            <tr key={i} className="even:bg-gray-50">
              <td className="py-3 px-4 border-b">{i + 1}</td>
              <td className="py-3 px-4 border-b">{row.firstName}</td>
              <td className="py-3 px-4 border-b">{row.lastName}</td>
              <td className="py-3 px-4 border-b">{row.participation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
