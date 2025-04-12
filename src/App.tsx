import "./App.css";
import useDatabase from "./hooks/useDatabase";

function App() {
  const { database, isLoading, error } = useDatabase();

  return (
    <main className="flex min-h-dvh justify-center bg-gradient-to-r from-[#5C258D] to-[#4389A2] py-2 text-white">
      <form className="h-fit space-y-3 border border-green-400 p-4">
        <div className="flex flex-col">
          <label htmlFor="form-select">Séléctionner la forme:</label>
          <select id="form-select">
            <option value="collyres">Collyres</option>
            <option value="sol. buv">Sol. Buv</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Nom de médicament:</label>
          <input placeholder="Zomax" className="border border-green-400 p-2" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="unity-select">Séléctionner l'unité:</label>
          <select id="unity-select">
            <option value="gouttes">Gouttes</option>
            <option value="milligrames">milligrames</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Capacité totale:</label>
          <input type="number" className="border border-green-400 p-2" />
        </div>

        <button className="bg-gray-400 p-2 hover:bg-gray-800">
          Enregistrement
        </button>
      </form>
    </main>
  );
}

export default App;
