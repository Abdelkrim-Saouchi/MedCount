import { Dispatch, SetStateAction } from "react";
import { Drug } from "./DrugList";
import { X } from "lucide-react";
import useDatabase from "../hooks/useDatabase";
import { FormeRow, UniteRow } from "./CreateDrugForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useError } from "../context/ErrorContext";

const DrugEditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  editingDrug,
  setEditingDrug,
}: {
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  editingDrug: Drug | null;
  setEditingDrug: Dispatch<SetStateAction<Drug | null>>;
}) => {
  const queryClient = useQueryClient();
  const { database } = useDatabase();
  const { showError } = useError();

  const { data } = useQuery({
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
    mutationFn: async (data: Drug) => {
      try {
        await database?.execute("PRAGMA foreign_keys = ON");

        await database?.execute(
          "UPDATE medicaments SET nomination = $1, capacite = $2, forme = $3, unite = $4 WHERE id = $5",
          [
            data.drug_name,
            data.capacity,
            data.forme_id,
            data.unite_id,
            data.id,
          ],
        );
      } catch (error) {
        showError(`Erreur lors de la mise à jour du médicament: ${error}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      setIsEditModalOpen(false);
      setEditingDrug(null);
    },
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDrug) return;

    // setDrugs(drugs.map(drug =>
    //   drug.id === editingDrug.id ? editingDrug : drug
    // ));
    mutation.mutate(editingDrug);
  };

  if (!isEditModalOpen || !editingDrug) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-[var(--content-bg)] shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Modifer Médicament
          </h3>
          <button
            onClick={() => {
              setIsEditModalOpen(false);
              setEditingDrug(null);
            }}
            className="text-gray-400 transition-colors duration-200 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleEditSubmit} className="space-y-4 p-6">
          <div>
            <label
              htmlFor="edit-name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              id="edit-name"
              value={editingDrug.drug_name}
              onChange={(e) =>
                setEditingDrug({ ...editingDrug, drug_name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="edit-forme"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Forme
            </label>
            <select
              id="edit-forme"
              value={editingDrug.forme_id}
              onChange={(e) =>
                setEditingDrug({ ...editingDrug, forme_id: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {data &&
                data.formeRows.map((forme) => (
                  <option key={forme.forme_id} value={forme.forme_id}>
                    {forme.nomination}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="edit-unit"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Unité
            </label>
            <select
              id="edit-unit"
              value={editingDrug.unite_id}
              onChange={(e) =>
                setEditingDrug({ ...editingDrug, unite_id: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {data &&
                data.uniteRows.map((unit) => (
                  <option key={unit.unite_id} value={unit.unite_id}>
                    {unit.nomination}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="edit-capacity"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Capacité
            </label>
            <input
              type="number"
              id="edit-capacity"
              value={editingDrug.capacity}
              onChange={(e) =>
                setEditingDrug({
                  ...editingDrug,
                  capacity: parseInt(e.target.value),
                })
              }
              className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingDrug(null);
              }}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DrugEditModal;
