import { Dispatch, SetStateAction, useState } from "react";
import { useError } from "../context/ErrorContext";
import { KeyRound, User, ArrowRight, Pill } from "lucide-react";

const Login = ({
  setAuthenticated,
}: {
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { showError } = useError();

  const hardcodedUsername = "admin";
  const hardcodedPassword = "123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInputs.username || !formInputs.password) return;

    setIsLoading(true);

    // Simulate a delay for better UX
    setTimeout(() => {
      if (
        formInputs.username === hardcodedUsername &&
        formInputs.password === hardcodedPassword
      ) {
        setAuthenticated(true);
      } else {
        showError("Nom d'utilisateur ou mot de passe incorrect");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
        {/* Left side - decorative element */}
        <div className="hidden bg-gradient-to-br from-blue-500 to-blue-700 p-12 text-white md:block md:w-1/2">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Pill className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-6 text-3xl font-bold">MedCount</h2>
              <p className="mb-8 text-lg opacity-90">
                Système de gestion pharmaceutique pour le calcul précis des
                doses et des quantités
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white/60"></div>
                <div className="h-2 w-2 rounded-full bg-white/60"></div>
              </div>

              <p className="text-sm opacity-80">
                © 2025 MedCount. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - login form */}
        <div className="w-full bg-[var(--content-bg)] p-10 md:w-1/2">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">Bienvenue</h2>
            <p className="text-gray-600">Connectez-vous pour continuer</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={formInputs.username}
                  onChange={(e) =>
                    setFormInputs({ ...formInputs, username: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] py-3 pr-4 pl-11 text-gray-700 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="Entrer votre nom d'utilisateur"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={formInputs.password}
                  onChange={(e) =>
                    setFormInputs({ ...formInputs, password: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-[var(--content-bg)] py-3 pr-4 pl-11 text-gray-700 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="Entrer votre mot de passe"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={
                !formInputs.username || !formInputs.password || isLoading
              }
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-blue-200/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <span>Se connecter</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-300 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
