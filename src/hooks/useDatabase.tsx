import { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import { useError } from "../context/ErrorContext";

const useDatabase = () => {
  const [database, setDatabase] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useError();

  useEffect(() => {
    let database: Database | null = null;
    let isMounted = true;

    const connectToDatabase = async () => {
      setIsLoading(true);
      try {
        database = await Database.load("sqlite:test.db");
        if (isMounted) {
          setDatabase(database);
        }
      } catch (error) {
        if (isMounted) {
          showError("Erreur de connexion à la base de données");
          setDatabase(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    connectToDatabase();

    return () => {
      isMounted = false;
      if (database) {
        console.log("closing database connection");
        database.close();
      }
    };
  }, [showError]);

  return {
    database,
    isLoading,
  };
};

export default useDatabase;
