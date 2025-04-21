import { useQuery } from "@tanstack/react-query";
import { Edit, Pill, Trash2 } from "lucide-react";
import useDatabase from "../hooks/useDatabase";
import { Dispatch, SetStateAction } from "react";

export type Drug = {
  id: string;
  drug_name: string;
  forme_name: string;
  forme_id?: string;
  unit_name: string;
  unite_id?: string;
  capacity: number;
};

const DrugList = ({
  handleEditClick,
  handleDeleteClick,
}: {
  handleEditClick: (drug: Drug) => void;
  handleDeleteClick: (drug: Drug) => void;
}) => {
  const { database } = useDatabase();
  const { data: drugs } = useQuery({
    queryKey: ["drugsList"],
    enabled: !!database,
    queryFn: async () => {
      if (database) {
        try {
          const result: Drug[] = await database.select(
            "SELECT id, medicaments.nomination AS drug_name, formes.nomination AS forme_name, formes.forme_id AS forme_id, unites.nomination As unit_name, unites.unite_id AS unite_id, medicaments.capacite AS capacity FROM medicaments INNER JOIN formes ON medicaments.forme = formes.forme_id INNER JOIN unites ON medicaments.unite = unites.unite_id",
          );
          return result;
        } catch (error) {
          console.log("Fetch druglist failed!");
        }
      }
    },
  });

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Liste des Médicaments disponibles
      </h2>
      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Médicament
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Forme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Capacité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {drugs &&
                drugs.map((drug) => (
                  <tr key={drug.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-blue-500" />
                        <div className="text-sm font-medium text-gray-900">
                          {drug.drug_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {drug.forme_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {drug.capacity} {drug.unit_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteClick(drug)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditClick(drug)}
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
        {drugs && drugs.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Il n'y pas de Médicaments.
          </div>
        )}
      </div>
    </div>
  );
};

export default DrugList;
