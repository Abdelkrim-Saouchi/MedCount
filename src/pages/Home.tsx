import { Calculator } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CalculateQuantity from "../components/CalculateQuantity";
import CalculateDose from "../components/CalculateDose";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dose");
  const [isScrolled, setIsScrolled] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mx-auto max-w-2xl pt-4">
      {/* Tabs */}
      <div ref={tabsRef} className={`sticky-tabs flex space-x-1 ${isScrolled ? 'scrolled' : ''}`}>
        <button
          onClick={() => setActiveTab("dose")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "dose"
              ? "bg-[var(--active-tab)] text-blue-600 shadow-md"
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
              ? "bg-[var(--active-tab)] text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Calculator className="h-4 w-4" />
          Calculer la qunatité
        </button>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-[var(--content-bg)] p-6 shadow-md">
        {activeTab === "dose" ? <CalculateDose /> : <CalculateQuantity />}
      </div>
    </div>
  );
};
export default Home;
