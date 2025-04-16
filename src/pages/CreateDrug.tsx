import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useDatabase from "../hooks/useDatabase";
import { FormEvent } from "react";
import { Calculator, PackagePlus, Ratio } from "lucide-react";
import { useState } from "react";
import CreateDrugForm from "../components/CreateDrugForm";
import CreateFormeForm from "../components/CreateFormeForm";
import CreateUnitForm from "../components/CreateUnitForm";
import DrugList from "../components/DrugList";

const CreateDrug = () => {
  const [activeTab, setActiveTab] = useState("drug");
  return (
    <div className="mx-auto max-w-2xl">
      {/* Tabs */}
      <div className="mb-6 flex space-x-1 rounded-xl bg-blue-100/50 p-1">
        <button
          onClick={() => setActiveTab("drug")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "drug"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <PackagePlus className="h-4 w-4" />
          Ajouter un médicament
        </button>
        <button
          onClick={() => setActiveTab("forme")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "forme"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Ratio className="h-4 w-4" />
          Ajouter une forme
        </button>
        <button
          onClick={() => setActiveTab("unite")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "unite"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Calculator className="h-4 w-4" />
          Ajouter une unité
        </button>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        {activeTab === "drug" ? (
          <>
            <CreateDrugForm />
            <DrugList />
          </>
        ) : activeTab === "forme" ? (
          <CreateFormeForm />
        ) : (
          <CreateUnitForm />
        )}
      </div>
    </div>
  );

  //   <main className="flex min-h-dvh justify-center bg-gradient-to-r from-[#5C258D] to-[#4389A2] py-2 text-white">
  //     <form
  //       onSubmit={onSubmit}
  //       className="h-fit space-y-3 border border-green-400 p-4"
  //     >
  //       <div className="flex flex-col">
  //         <label htmlFor="form-select">Séléctionner la forme:</label>
  //         <select id="form-select" name="forme_id">
  //           {!dataIsLoading &&
  //             data?.formeRows.map((forme) => {
  //               return (
  //                 <option key={forme.forme_id} value={forme.forme_id}>
  //                   {forme.nomination}
  //                 </option>
  //               );
  //             })}
  //         </select>
  //         {isError && <p className="text-red-600">{err.message}</p>}
  //       </div>
  //
  //       <div className="flex flex-col">
  //         <label>Nom de médicament:</label>
  //         <input
  //           placeholder="Zomax"
  //           name="nomination"
  //           className="border border-green-400 p-2"
  //         />
  //       </div>
  //
  //       <div className="flex flex-col">
  //         <label htmlFor="unity-select">Séléctionner l'unité:</label>
  //         <select id="unity-select" name="unités_id">
  //           {!dataIsLoading &&
  //             data?.uniteRows.map((unite) => (
  //               <option key={unite.unite_id} value={unite.unite_id}>
  //                 {unite.nomination}
  //               </option>
  //             ))}
  //         </select>
  //         {isError && <p className="text-red-600">{err.message}</p>}
  //       </div>
  //
  //       <div className="flex flex-col">
  //         <label>Capacité totale:</label>
  //         <input
  //           type="number"
  //           name="capacité"
  //           className="border border-green-400 p-2"
  //         />
  //       </div>
  //
  //       <button type="submit" className="bg-gray-400 p-2 hover:bg-gray-800">
  //         Enregistrement
  //       </button>
  //     </form>
  //   </main>
  // );
};

export default CreateDrug;
