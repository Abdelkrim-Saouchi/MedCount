import { useState } from "react";
import useDatabase from "../hooks/useDatabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useError } from "../context/ErrorContext";

const CreateUnitForm = () => {
  const queryClient = useQueryClient();
  const [unitName, setUnitName] = useState("");
  const { database } = useDatabase();
  const { showError } = useError();

  const mutation = useMutation({
    mutationFn: async (data: string) => {
      try {
        await database?.execute("INSERT INTO unites (nomination) VALUES ($1)", [
          data,
        ]);
      } catch (error) {
        showError(`L'unité ${data} n'a pas pu être créée: ${error}`);
      }
    },
    onSuccess: () => {
      setUnitName("");
      queryClient.invalidateQueries();
    },
  });

  const handleFormInputsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unitName == "") {
      return;
    }
    mutation.mutate(unitName);
  };

  return (
    <form onSubmit={handleFormInputsSubmit} className="space-y-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Créer une nouvelle unité:
      </h2>
      <div>
        <label
          htmlFor="formeName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Nom de l'unité
        </label>
        <input
          type="text"
          id="formeName"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ex: Milligrammes"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
      >
        Créer l'unité
      </button>
    </form>
  );
};

export default CreateUnitForm;
