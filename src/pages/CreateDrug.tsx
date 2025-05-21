import { Calculator, PackagePlus, Ratio, Scale } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CreateDrugForm from "../components/CreateDrugForm";
import CreateFormeForm from "../components/CreateFormeForm";
import CreateUnitForm from "../components/CreateUnitForm";
import DrugList, { Drug } from "../components/DrugList";
import DrugEditModal from "../components/DrugEditModal";
import DeletingModal from "../components/DeletingModal";
import FormeList, { Forme } from "../components/FormeList";
import FormeEditModal from "../components/FormeEditModal";
import UnitList, { Unit } from "../components/UnitList";
import UnitEditModal from "../components/UnitEditModal";
import CreatePosologyForm from "../components/CreatePosologyForm";
import PosologiesList, { Posology } from "../components/PosologiesList";
import PosologyEditModal from "../components/PosologyEditModal";

const CreateDrug = () => {
  const [activeTab, setActiveTab] = useState("drug");
  const [isScrolled, setIsScrolled] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isEditFormeModalOpen, setIsEditFormeModalOpen] = useState(false);
  const [editingForme, setEditingForme] = useState<Forme | null>(null);

  const [tableName, setTabaleName] = useState("medicaments");
  const [idName, setIdName] = useState("id");

  const [isEditUnitModalOpen, setIsEditUnitModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  const [isEditPosologyModalOpen, setIsEditPosologyModalOpen] = useState(false);
  const [editingPosology, setEditingPosology] = useState<Posology | null>(null);

  const handleEditClick = (drug: Drug) => {
    setEditingDrug(drug);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (drug: Drug) => {
    setTabaleName("medicaments");
    setIdName("id");
    setDeletingId(drug.id);
    setIsDeleteModalOpen(true);
  };

  const handleEditFormeClick = (forme: Forme) => {
    setEditingForme(forme);
    setIsEditFormeModalOpen(true);
  };

  const handleDeleteFormeClick = (forme: Forme) => {
    setTabaleName("formes");
    setIdName("forme_id");
    setDeletingId(forme.forme_id);
    setIsDeleteModalOpen(true);
  };

  const handleUnitEditClick = (unit: Unit) => {
    setEditingUnit(unit);
    setIsEditUnitModalOpen(true);
  };

  const handleUnitDeleteClick = (unit: Unit) => {
    setTabaleName("unites");
    setIdName("unite_id");
    setDeletingId(unit.unite_id);
    setIsDeleteModalOpen(true);
  };

  const handleEditPosologyClick = (posology: Posology) => {
    setEditingPosology(posology);
    setIsEditPosologyModalOpen(true);
  };
  const handleDeletePosologyClick = (posology: Posology) => {
    setTabaleName("par_kg_jour");
    setIdName("id");
    setDeletingId(posology.id);
    setIsDeleteModalOpen(true);
  };

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
          onClick={() => setActiveTab("drug")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "drug"
              ? "bg-[var(--active-tab)] text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <PackagePlus className="h-4 w-4" />
          Médicament
        </button>
        <button
          onClick={() => setActiveTab("forme")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "forme"
              ? "bg-[var(--active-tab)] text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Ratio className="h-4 w-4" />
          Forme
        </button>
        <button
          onClick={() => setActiveTab("unite")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "unite"
              ? "bg-[var(--active-tab)] text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Calculator className="h-4 w-4" />
          Unité
        </button>
        <button
          onClick={() => setActiveTab("posology")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
            activeTab === "posology"
              ? "bg-[var(--active-tab)] text-blue-600 shadow-md"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Scale className="h-4 w-4" />
          Posologie
        </button>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-[var(--content-bg)] p-6 shadow-md">
        {activeTab === "drug" ? (
          <>
            <CreateDrugForm />
            <DrugList
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
            <DrugEditModal
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              editingDrug={editingDrug}
              setEditingDrug={setEditingDrug}
            />
          </>
        ) : activeTab === "forme" ? (
          <>
            <CreateFormeForm />
            <FormeList
              handleEditFormeClick={handleEditFormeClick}
              handleDeleteFormeClick={handleDeleteFormeClick}
            />
            <FormeEditModal
              isEditFormeModalOpen={isEditFormeModalOpen}
              setIsEditFormeModalOpen={setIsEditFormeModalOpen}
              editingForme={editingForme}
              setEditingForme={setEditingForme}
            />
          </>
        ) : activeTab === "unite" ? (
          <>
            <CreateUnitForm />
            <UnitList
              handleEditUnitClick={handleUnitEditClick}
              handleDeleteUnitClick={handleUnitDeleteClick}
            />
            <UnitEditModal
              isEditUnitModalOpen={isEditUnitModalOpen}
              setIsEditUnitModalOpen={setIsEditUnitModalOpen}
              editingUnit={editingUnit}
              setEditingUnit={setEditingUnit}
            />
          </>
        ) : (
          <>
            <CreatePosologyForm />
            <PosologiesList
              handleEditPosologyClick={handleEditPosologyClick}
              handleDeletePosologyClick={handleDeletePosologyClick}
            />
            <PosologyEditModal
              isEditPosologyModalOpen={isEditPosologyModalOpen}
              setIsEditPosologyModalOpen={setIsEditPosologyModalOpen}
              editingPosology={editingPosology}
              setEditingPosology={setEditingPosology}
            />
          </>
        )}
      </div>
      <DeletingModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deletingId={deletingId}
        setDeletingId={setDeletingId}
        tableName={tableName}
        idName={idName}
      />
    </div>
  );
};

export default CreateDrug;
