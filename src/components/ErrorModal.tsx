import { X } from "lucide-react";
import { useError } from "../context/ErrorContext";

const ErrorModal = () => {
  const { error, hideError } = useError();

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-[var(--content-bg)] shadow-lg">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <X className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800">Erreur</h3>
          <p className="mb-6 text-gray-600">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={hideError}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
