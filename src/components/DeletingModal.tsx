import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import useDatabase from "../hooks/useDatabase";
import { useError } from "../context/ErrorContext";

const DeletingModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  deletingId,
  setDeletingId,
  tableName,
  idName,
}: {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  deletingId: string | null;
  setDeletingId: Dispatch<SetStateAction<string | null>>;
  tableName: string;
  idName: string;
}) => {
  const queryClient = useQueryClient();
  const { database } = useDatabase();
  const { showError } = useError();
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await database?.execute(
          `DELETE FROM ${tableName} WHERE ${idName} = $1`,
          [deletingId],
        );
      } catch (error) {
        showError(`La delétion a échoué: ${error}`);
      }
    },
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries();
    },
  });

  const handleConfirmDelete = () => {
    mutation.mutate();
  };

  if (!isDeleteModalOpen || deletingId === null) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Confirmer la Délétion
          </h3>
          <p className="mb-6 text-gray-600">
            vous êtes sûr ? Cette action est irréversible.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingId(null);
              }}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
            >
              Non, Annuler
            </button>
            <button
              onClick={handleConfirmDelete}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700"
            >
              {mutation.isPending ? "Patientez..." : "Oui, Supprimer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletingModal;
