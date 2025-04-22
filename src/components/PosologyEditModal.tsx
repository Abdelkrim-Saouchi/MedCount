import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { Posology } from "./PosologiesList";
import { X } from "lucide-react";

const PosologyEditModal = ({
  isEditPosologyModalOpen,
  setIsEditPosologyModalOpen,
  editingPosology,
  setEditingPosology,
}: {
  isEditPosologyModalOpen: boolean;
  setIsEditPosologyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingPosology: Posology | null;
  setEditingPosology: React.Dispatch<React.SetStateAction<Posology | null>>;
}) => {
  const queryClient = useQueryClient();
  const { database } = useDatabase();
  const mutation = useMutation({
    mutationFn: async (posology: Posology) => {
      try {
        await database?.execute(
          "UPDATE par_kg_jour SET poso_par_kg = $1 WHERE id = $2",
          [posology.poso_par_kg, posology.id],
        );
      } catch (error) {
        console.log("update forme failed ", error);
      }
    },
    onSuccess: () => {
      setIsEditPosologyModalOpen(false);
      setEditingPosology(null);
      queryClient.invalidateQueries();
    },
  });

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPosology) return;

    mutation.mutate(editingPosology);
  };

  if (!isEditPosologyModalOpen || !editingPosology) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Modifer la posologie
          </h3>
          <button
            onClick={() => {
              setIsEditPosologyModalOpen(false);
              setEditingPosology(null);
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
              Posologie
            </label>
            <input
              type="number"
              id="edit-name"
              value={editingPosology?.poso_par_kg}
              onChange={(e) => {
                if (editingPosology) {
                  setEditingPosology({
                    ...editingPosology,
                    poso_par_kg: e.target.value,
                  });
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsEditPosologyModalOpen(false);
                setEditingPosology(null);
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

export default PosologyEditModal;
