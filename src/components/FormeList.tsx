import { useQuery } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { Edit, Pill, Trash2 } from "lucide-react";

export type Forme = {
  forme_id: string;
  nomination: string;
};

const FormeList = ({
  handleDeleteFormeClick,
  handleEditFormeClick,
}: {
  handleDeleteFormeClick: (forme: Forme) => void;
  handleEditFormeClick: (forme: Forme) => void;
}) => {
  const { database } = useDatabase();
  const { data: formes } = useQuery({
    queryKey: ["drugsList"],
    enabled: !!database,
    queryFn: async () => {
      if (database) {
        try {
          const result: Forme[] = await database.select("SELECT * FROM formes");
          return result;
        } catch (error) {
          console.log("Fetch formes failed!");
        }
      }
    },
  });

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Liste des formes disponibles
      </h2>
      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Forme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {formes &&
                formes.map((forme) => (
                  <tr key={forme.forme_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-blue-500" />
                        <div className="text-sm font-medium text-gray-900">
                          {forme.nomination}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteFormeClick(forme)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditFormeClick(forme)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {formes && formes.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Il n'y pas de formes.
          </div>
        )}
      </div>
    </div>
  );
};
export default FormeList;
