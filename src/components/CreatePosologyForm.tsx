import { useState } from "react";
import { Drug } from "./DrugList";
import { Pill, Search, X } from "lucide-react";
import useDatabase from "../hooks/useDatabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CreatePosologyForm = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [unitPerKg, setUnitPerKg] = useState("");
  const [frequancy, setFrequancy] = useState(0);
  const [isCalculable, setIsCalculable] = useState(0);
  const [mgInMl, setMgInMl] = useState(0);

  const { database } = useDatabase();
  const { data: drugs } = useQuery({
    queryKey: ["drugsList"],
    enabled: !!database,
    queryFn: async () => {
      if (!database) {
        throw new Error("Database connection not available");
      }
      try {
        const result: Drug[] = await database.select(
          "SELECT id, medicaments.nomination AS drug_name, formes.nomination AS forme_name, formes.forme_id AS forme_id, unites.nomination As unit_name, unites.unite_id AS unite_id, medicaments.capacite AS capacity FROM medicaments INNER JOIN formes ON medicaments.forme = formes.forme_id INNER JOIN unites ON medicaments.unite = unites.unite_id",
        );
        if (!result) {
          return [];
        }
        return result;
      } catch (error) {
        console.log("Fetch druglist failed!", error);
        throw new Error("Failed to fetch drug list");
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!database) {
        throw new Error("Database connection not available");
      }
      try {
        await database.execute(
          "INSERT INTO par_kg_jour (medicament_id, poso_par_kg, fequence, calculabe_ml, mg_par_ml) VALUES ($1, $2, $3, $4, $5)",
          [
            selectedDrug?.id,
            parseFloat(unitPerKg),
            frequancy,
            isCalculable,
            mgInMl,
          ],
        );
      } catch (error) {
        console.log("Insert posology failed!", error);
        throw new Error("Failed to insert posology");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      setSelectedDrug(null);
      setUnitPerKg("");
      setFrequancy(0);
      setSearchTerm("");
    },
  });

  const handlePosologySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const filteredDrugs =
    drugs?.filter((drug) =>
      drug.drug_name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <form onSubmit={handlePosologySubmit} className="space-y-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Ajouter une nouvelle posologie
      </h2>

      {/* Search Drug */}
      <div className="relative">
        <label
          htmlFor="search"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Recherche un médicament
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="rechercher un médicament..."
          />
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Search Results */}
        {searchTerm && filteredDrugs.length > 0 && !selectedDrug && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            {filteredDrugs.map((drug) => (
              <button
                key={drug.id}
                type="button"
                onClick={() => {
                  setSelectedDrug(drug);
                  setSearchTerm(drug.drug_name);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-50"
              >
                <Pill className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-900">{drug.drug_name}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {drug.capacity} {drug.unit_name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Drug Info */}
      {selectedDrug && (
        <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
          <div className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {selectedDrug.drug_name}
              </h3>
              <p className="text-xs text-gray-500">
                {selectedDrug.capacity} {selectedDrug.unit_name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedDrug(null);
              setSearchTerm("");
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Posology Input */}
      <div>
        <label
          htmlFor="mgPerKg"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Unité par Kilograme par jour
        </label>
        <input
          type="number"
          id="mgPerKg"
          value={unitPerKg}
          onChange={(e) => setUnitPerKg(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Entrer unité/kg/j"
          step="0.1"
        />
      </div>
      {/* frequancy Input */}
      <div>
        <label
          htmlFor="frequancy"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Fréquence de prise
        </label>
        <input
          type="number"
          id="frequancy"
          value={frequancy}
          onChange={(e) => setFrequancy(parseInt(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Entrer unité/kg"
          step="0.1"
        />
      </div>

      {/* Claculable question */}
      <div>
        <label
          htmlFor="isCalculable"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Calculable
        </label>
        <select
          id="isCalculable"
          value={isCalculable}
          onChange={(e) => setIsCalculable(parseInt(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="1">Oui</option>
          <option value="0">Non</option>
        </select>
      </div>

      {/* mg in ml */}
      {isCalculable === 1 && (
        <div>
          <label
            htmlFor="mgInMl"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            mg en ml
          </label>
          <input
            type="number"
            id="mgInMl"
            value={mgInMl}
            onChange={(e) => setMgInMl(parseInt(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Entrer mg/ml"
            step="0.1"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedDrug || !unitPerKg || !frequancy}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Créer
      </button>
    </form>
  );
};

export default CreatePosologyForm;
