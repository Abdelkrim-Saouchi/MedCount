import { useQuery } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { Edit, Pill, Trash2 } from "lucide-react";

export type Unit = {
  unite_id: string;
  nomination: string;
};

const UnitList = ({
  handleDeleteUnitClick,
  handleEditUnitClick,
}: {
  handleDeleteUnitClick: (unit: Unit) => void;
  handleEditUnitClick: (unit: Unit) => void;
}) => {
  const { database } = useDatabase();
  const { data: units } = useQuery({
    queryKey: ["unitsList"],
    enabled: !!database,
    queryFn: async () => {
      if (database) {
        try {
          const result: Unit[] = await database.select("SELECT * FROM unites");
          return result;
        } catch (error) {
          console.log("Fetch units failed!");
        }
      }
    },
  });
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Liste des unités disponibles
      </h2>
      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        <div className="overlflow-y-scroll h-[400px] overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Unité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {units &&
                units.map((unit) => (
                  <tr key={unit.unite_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-blue-500" />
                        <div className="text-sm font-medium text-gray-900">
                          {unit.nomination}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteUnitClick(unit)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditUnitClick(unit)}
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
        {units && units.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Il n'y pas de unités disponibles.
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitList;
