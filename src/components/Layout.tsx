import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { FormEvent } from "react";

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

const Layout = () => {
  const queryClient = useQueryClient();

  const { database, isLoading, error } = useDatabase();

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
        console.log("transaction failed", error);
      }
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    const formeId = data.get("forme_id") as string;
    const nomination = data.get("nomination") as string;
    const unitéId = data.get("unités_id") as string;
    const capacité = data.get("capacité") as string;

    mutation.mutate({
      formeId,
      nomination,
      unitéId,
      capacité,
    });
  };

  return (
    <main className="flex min-h-dvh justify-center bg-gradient-to-r from-[#5C258D] to-[#4389A2] py-2 text-white">
      <form
        onSubmit={onSubmit}
        className="h-fit space-y-3 border border-green-400 p-4"
      >
        <div className="flex flex-col">
          <label htmlFor="form-select">Séléctionner la forme:</label>
          <select id="form-select" name="forme_id">
            {!dataIsLoading &&
              data?.formeRows.map((forme) => {
                return (
                  <option key={forme.forme_id} value={forme.forme_id}>
                    {forme.nomination}
                  </option>
                );
              })}
          </select>
          {isError && <p className="text-red-600">{err.message}</p>}
        </div>

        <div className="flex flex-col">
          <label>Nom de médicament:</label>
          <input
            placeholder="Zomax"
            name="nomination"
            className="border border-green-400 p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="unity-select">Séléctionner l'unité:</label>
          <select id="unity-select" name="unités_id">
            {!dataIsLoading &&
              data?.uniteRows.map((unite) => (
                <option key={unite.unite_id} value={unite.unite_id}>
                  {unite.nomination}
                </option>
              ))}
          </select>
          {isError && <p className="text-red-600">{err.message}</p>}
        </div>

        <div className="flex flex-col">
          <label>Capacité totale:</label>
          <input
            type="number"
            name="capacité"
            className="border border-green-400 p-2"
          />
        </div>

        <button type="submit" className="bg-gray-400 p-2 hover:bg-gray-800">
          Enregistrement
        </button>
      </form>
    </main>
  );
};

export default Layout;
