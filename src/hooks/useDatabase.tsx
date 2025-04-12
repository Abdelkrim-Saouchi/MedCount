import { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";

const useDatabase = () => {
  const [database, setDatabase] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    let database: Database | null = null;
    let isMounted = true;

    const connectToDatabase = async () => {
      setIsLoading(true);
      setError(null);
      try {
        database = await Database.load("sqlite:test.db");
        if (isMounted) {
          setDatabase(database);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
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
  }, []);

  return {
    database,
    isLoading,
    error,
  };
};

export default useDatabase;
