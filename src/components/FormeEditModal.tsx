import React, { useState } from "react";
import { Forme } from "./FormeList";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";

const FormeEditModal = ({
  isEditFormeModalOpen,
  setIsEditFormeModalOpen,
  editingForme,
  setEditingForme,
}: {
  isEditFormeModalOpen: boolean;
  setIsEditFormeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingForme: Forme | null;
  setEditingForme: React.Dispatch<React.SetStateAction<Forme | null>>;
}) => {
  const queryClient = useQueryClient();
  const { database } = useDatabase();
  const mutation = useMutation({
    mutationFn: async (forme: Forme) => {
      try {
        await database?.execute(
          "UPDATE formes SET nomination = $1 WHERE forme_id = $2",
          [forme.nomination, forme.forme_id],
        );
      } catch (error) {
        console.log("update forme failed ", error);
      }
    },
    onSuccess: () => {
      setIsEditFormeModalOpen(false);
      setEditingForme(null);
      queryClient.invalidateQueries();
    },
  });

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingForme) return;

    mutation.mutate(editingForme);
  };

  if (!isEditFormeModalOpen || !editingForme) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Modifer La forme
          </h3>
          <button
            onClick={() => {
              setIsEditFormeModalOpen(false);
              setEditingForme(null);
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
              value={editingForme?.nomination}
              onChange={(e) => {
                if (editingForme) {
                  setEditingForme({
                    ...editingForme,
                    nomination: e.target.value,
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
                setIsEditFormeModalOpen(false);
                setEditingForme(null);
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
export default FormeEditModal;
