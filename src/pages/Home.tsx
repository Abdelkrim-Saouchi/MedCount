import { Calculator } from "lucide-react";
import { useState } from "react";
import CalculateQuantity from "../components/CalculateQuantity";
import CalculateDose from "../components/CalculateDose";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dose");
  return (
    <div className="mx-auto max-w-2xl">
      {/* Tabs */}
      <div className="mb-6 flex space-x-1 rounded-xl bg-blue-100/50 p-1">
        <button
          onClick={() => setActiveTab("dose")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "dose"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Calculator className="h-4 w-4" />
          Calculer la dose
        </button>
        <button
          onClick={() => setActiveTab("quantity")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "quantity"
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Calculator className="h-4 w-4" />
          Calculer la qunatité
        </button>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        {activeTab === "dose" ? <CalculateDose /> : <CalculateQuantity />}
      </div>
    </div>
  );
};
export default Home;
