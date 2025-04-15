import { useState } from "react";
import { Calculator, PackagePlus, Ratio } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";

type DataForm = {
  formeId: String | null;
  nomination: string | null;
  unitéId: string | null;
  capacité: string | null;
};

type FormeRow = {
  forme_id: number;
  nomination: string;
};

type UniteRow = {
  unite_id: number;
  nomination: string;
};

const CreateDrugForm = () => {
  const [formInputs, setFormInputs] = useState({
    forme: "",
    drugName: "",
    unit: "",
    capacity: "",
  });

  const { database } = useDatabase();

  const {
    isLoading: dataIsLoading,
    isError,
    error: err,
    data,
  } = useQuery({
    queryKey: ["formes_unites"],
    enabled: !!database,
    queryFn: async () => {
      if (database) {
        const formeRows: FormeRow[] = await database.select(
          "SELECT * FROM formes",
        );
        const uniteRows: UniteRow[] = await database.select(
          "SELECT * FROM unites",
        );
        return {
          formeRows,
          uniteRows,
        };
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: DataForm) => {
      try {
        await database?.execute("PRAGMA foreign_keys = ON");

        await database?.execute(
          "INSERT INTO medicaments (nomination, capacite, forme, unite) VALUES ($1, $2, $3, $4)",
          [data.nomination, data.capacité, data.formeId, data.unitéId],
        );
      } catch (error) {
        console.log("Create Drug failed", error);
      }
    },
    onSuccess: () => {
      setFormInputs({ forme: "", drugName: "", unit: "", capacity: "" });
    },
  });

  const handleFormInputsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formInputs.forme == "" ||
      formInputs.drugName == "" ||
      formInputs.unit == "" ||
      formInputs.capacity == ""
    ) {
      return;
    }

    mutation.mutate({
      formeId: formInputs.forme,
      nomination: formInputs.drugName,
      unitéId: formInputs.unit,
      capacité: formInputs.capacity,
    });
  };

  return (
    <form onSubmit={handleFormInputsSubmit} className="space-y-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Créer un nouveau médicament:
      </h2>
      <div>
        <label
          htmlFor="forme"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Sélectionner une forme
        </label>
        <select
          id="forme"
          value={formInputs.forme}
          onChange={(e) =>
            setFormInputs({ ...formInputs, forme: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Sélectionner une forme</option>
          {data?.formeRows.map((forme) => (
            <option key={forme.forme_id} value={forme.forme_id}>
              {forme.nomination}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="drugName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Nom de médicament
        </label>
        <input
          type="text"
          id="drugName"
          value={formInputs.drugName}
          onChange={(e) =>
            setFormInputs({ ...formInputs, drugName: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ex: Doliprane 500"
        />
      </div>
      <div>
        <label
          htmlFor="unit"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Unité de mesure
        </label>
        <select
          id="unit"
          value={formInputs.unit}
          onChange={(e) =>
            setFormInputs({ ...formInputs, unit: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Sélectionner un unité</option>
          {data?.uniteRows.map((unit) => (
            <option key={unit.unite_id} value={unit.unite_id}>
              {unit.nomination}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="capacity"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Capacité totale
        </label>
        <input
          type="number"
          id="capacity"
          value={formInputs.capacity}
          onChange={(e) =>
            setFormInputs({ ...formInputs, capacity: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ex: 2000"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
      >
        Créer le médicament
      </button>
    </form>
  );
};

export default CreateDrugForm;
