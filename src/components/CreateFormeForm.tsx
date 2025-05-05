import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useDatabase from "../hooks/useDatabase";
import { useError } from "../context/ErrorContext";

const CreateFormeForm = () => {
  const queryClient = useQueryClient();
  const [formeName, setFormeName] = useState("");
  const { database } = useDatabase();
  const { showError } = useError();

  const mutation = useMutation({
    mutationFn: async (data: string) => {
      try {
        await database?.execute("INSERT INTO formes (nomination) VALUES ($1)", [
          data,
        ]);
      } catch (error) {
        showError(`la création de la forme a échoué: ${error}`);
      }
    },
    onSuccess: () => {
      setFormeName("");
      queryClient.invalidateQueries();
    },
  });

  const handleFormInputsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formeName == "") {
      return;
    }
    mutation.mutate(formeName);
  };

  return (
    <form onSubmit={handleFormInputsSubmit} className="space-y-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Créer un nouvelle forme:
      </h2>
      <div>
        <label
          htmlFor="formeName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Nom de la forme
        </label>
        <input
          type="text"
          id="formeName"
          value={formeName}
          onChange={(e) => setFormeName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ex: Collyres"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
      >
        Créer la forme
      </button>
    </form>
  );
};
export default CreateFormeForm;
