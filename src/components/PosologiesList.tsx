import { useQuery } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { Edit, Pill, Trash2 } from "lucide-react";
import { useError } from "../context/ErrorContext";

export type Posology = {
  id: string;
  medId?: string;
  drug_name: string;
  forme_name: string;
  forme_id?: string;
  unit_name: string;
  unite_id?: string;
  capacity: number;
  poso_par_kg: string;
  frequence: number;
  isCalculable: number;
  mg_par_ml: number;
};

const PosologiesList = ({
  handleDeletePosologyClick,
  handleEditPosologyClick,
}: {
  handleDeletePosologyClick: (posology: Posology) => void;
  handleEditPosologyClick: (posology: Posology) => void;
}) => {
  const { database } = useDatabase();
  const { showError } = useError();
  const { data: posologies } = useQuery({
    queryKey: ["posologiesList"],
    enabled: !!database,
    queryFn: async () => {
      if (!database) {
        showError("Database connection not available");
        throw new Error("Database connection not available");
      }
      try {
        const result: Posology[] = await database.select(
          "SELECT par_kg_jour.id AS id, medicaments.id AS medId, medicaments.nomination AS drug_name, formes.nomination AS forme_name, formes.forme_id AS forme_id, unites.nomination As unit_name, unites.unite_id AS unite_id, medicaments.capacite AS capacity, par_kg_jour.poso_par_kg AS poso_par_kg, par_kg_jour.fequence AS frequence, par_kg_jour.calculabe_ml AS isCalculable, par_kg_jour.mg_par_ml AS mg_par_ml FROM medicaments INNER JOIN formes ON medicaments.forme = formes.forme_id INNER JOIN unites ON medicaments.unite = unites.unite_id INNER JOIN par_kg_jour ON medicaments.id = par_kg_jour.medicament_id",
        );
        if (!result) {
          return [];
        }
        return result;
      } catch (error) {
        showError(`l'obtention des posologies a échoué: ${error}`);
        throw new Error("Failed to fetch drug list");
      }
    },
  });

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Liste des posologies disponibles
      </h2>
      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        <div className="h-[400px] overflow-x-scroll overflow-y-scroll">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Médicament
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Forme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Posologie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Fréquence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Calculable en ml?
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Mg en ml
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {posologies &&
                posologies.map((posology) => (
                  <tr key={posology.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-blue-500" />
                        <div className="text-sm font-medium text-gray-900">
                          {posology.drug_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {posology.forme_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {posology.poso_par_kg} {posology.unit_name}/j
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {posology.frequence}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {posology.isCalculable === 1 ? "Oui" : "Non"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {posology.mg_par_ml} mg
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeletePosologyClick(posology)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditPosologyClick(posology)}
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
        {posologies && posologies.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Il n'y pas de posologies.
          </div>
        )}
      </div>
    </div>
  );
};

export default PosologiesList;
