import { Pill, Search, Weight, X } from "lucide-react";
import { useState } from "react";
import { Drug } from "./DrugList";
import useDatabase from "../hooks/useDatabase";
import { useQuery } from "@tanstack/react-query";
import { Posology } from "./PosologiesList";
import { useError } from "../context/ErrorContext";

const CalculateDose = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [calculationResult, setCalculationResult] = useState<number | null>(
    null,
  );
  const [quantityInputs, setQuantityInputs] = useState({
    weight: "",
    selectedPosology: "",
    takeUnits: "",
  });

  const { database } = useDatabase();
  const { showError } = useError();
  const { data: drugs } = useQuery({
    queryKey: ["drugsList"],
    enabled: !!database,
    queryFn: async () => {
      if (!database) {
        showError("Database connection not available");
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
        showError(`L'obtention des médicaments a échoué: ${error}`);
        throw new Error("Failed to fetch drug list");
      }
    },
  });

  const { data: posologiesInMl } = useQuery({
    queryKey: ["posologyInMl"],
    enabled: !!database,
    queryFn: async () => {
      if (!database) {
        showError("Database connection not available");
        throw new Error("Database connection not available");
      }
      try {
        const result: Posology[] = await database.select(
          "SELECT par_kg_jour.id AS id, medicaments.id AS medId, medicaments.nomination AS drug_name, formes.nomination AS forme_name, formes.forme_id AS forme_id, unites.nomination As unit_name, unites.unite_id AS unite_id, medicaments.capacite AS capacity, par_kg_jour.poso_par_kg AS poso_par_kg, par_kg_jour.fequence AS frequence, par_kg_jour.calculabe_ml AS isCalculable, par_kg_jour.mg_par_ml AS mg_par_ml FROM medicaments INNER JOIN formes ON medicaments.forme = formes.forme_id INNER JOIN unites ON medicaments.unite = unites.unite_id INNER JOIN par_kg_jour ON medicaments.id = par_kg_jour.medicament_id WHERE calculabe_ml = 1",
        );
        if (!result) {
          return [];
        }
        return result;
      } catch (error) {
        showError(`L'obtenir de la liste des posologies a échoué: ${error}`);
        throw new Error("Failed to fetch drug list");
      }
    },
  });

  const filteredDrugs =
    drugs?.filter((drug) =>
      drug.drug_name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const filteredPosologies =
    posologiesInMl?.filter((posology) => posology.medId == selectedDrug?.id) ||
    [];
  const selectedDrugPosology = filteredPosologies.find(
    (posology: Posology) => posology.medId == selectedDrug?.id,
  );

  const handleCalculateDose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDrug) return;

    if (selectedDrug.forme_name == "sol. buv.") {
      if (!quantityInputs.weight || !quantityInputs.selectedPosology) return;
      const weight = parseFloat(quantityInputs.weight);
      const dosagePerKg = parseFloat(quantityInputs.selectedPosology);

      // Calculate total mg needed per day
      const mgPerDay = weight * dosagePerKg;
      const mgPerMl = selectedDrugPosology?.mg_par_ml || 1;

      const mlPerDay = mgPerDay / mgPerMl;

      setCalculationResult(mlPerDay);
      return;
    }
  };

  return (
    <form onSubmit={handleCalculateDose} className="space-y-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Calculer la dose requise
      </h2>

      {/* Search Drug */}
      <div className="relative">
        <label
          htmlFor="search"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Rechercher un médicament
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Rechercher un médicament..."
          />
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Search Results */}
        {searchTerm && filteredDrugs.length > 0 && !selectedDrug && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-[var(--content-bg)] shadow-lg">
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
        <div className="flex items-center justify-between rounded-lg bg-blue-100/30 p-4">
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

      {/* Weight Input */}
      {filteredPosologies.length > 0 &&
        selectedDrug?.forme_name == "sol. buv." && (
          <div>
            <label
              htmlFor="weight"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Poids du patient (kg)
            </label>
            <div className="relative">
              <input
                type="number"
                id="weight"
                value={quantityInputs.weight}
                onChange={(e) =>
                  setQuantityInputs({
                    ...quantityInputs,
                    weight: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Entrer le poids du patient"
              />
              <Weight className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}

      {/* Posology Selection */}
      {filteredPosologies.length > 0 &&
        selectedDrug?.forme_name == "sol. buv." && (
          <div>
            <label
              htmlFor="posology"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Séléctionner la posologie
            </label>
            <select
              id="posology"
              value={quantityInputs.selectedPosology}
              onChange={(e) =>
                setQuantityInputs({
                  ...quantityInputs,
                  selectedPosology: e.target.value,
                })
              }
              className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Séléctionner la posologie par kg</option>
              {filteredPosologies &&
                filteredPosologies.map((option) => (
                  <option key={option.id} value={option.poso_par_kg}>
                    {option.poso_par_kg} {option.unit_name}/kg/j
                  </option>
                ))}
            </select>
          </div>
        )}

      {/* is not cacluable indicator */}
      {filteredPosologies.length == 0 && selectedDrug && (
        <div className="mt-4 rounded-lg border border-red-100 bg-red-50/70 p-4">
          <p className="text-sm font-medium text-red-800">
            Ce médicament n'est pas calculabe en ml.
          </p>
        </div>
      )}

      {/* Calculate Button */}
      <button
        type="submit"
        disabled={
          !selectedDrug || selectedDrug.forme_name == "sol. buv."
            ? !quantityInputs.weight || !quantityInputs.selectedPosology
            : !quantityInputs.takeUnits
        }
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Calculer
      </button>

      {/* Calculation Result */}
      {calculationResult && (
        <div className="mt-4 rounded-lg border border-green-100 bg-green-50/70 p-4">
          <p className="text-lg font-medium text-green-800">
            <p>Résultat: {calculationResult.toFixed(2)}</p>
            <p className="font-bold">
              le patient a besoin de {calculationResult.toFixed(2)} ml par jour
              repartis en {selectedDrugPosology?.frequence} prises, soit{" "}
              {calculationResult / (selectedDrugPosology?.frequence || 1)} ml
              par prise.
            </p>
          </p>
        </div>
      )}
    </form>
  );
};

export default CalculateDose;
