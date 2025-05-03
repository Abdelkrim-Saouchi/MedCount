import { Dispatch, SetStateAction, useState } from "react";
import ErrorModal from "./ErrorModal";

const Login = ({
  setAuthenticated,
}: {
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const hardcodedUsername = "admin";
  const hardcodedPassword = "123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInputs.username || !formInputs.password) return;
    // Handle login
    if (
      formInputs.username === hardcodedUsername &&
      formInputs.password === hardcodedPassword
    ) {
      setAuthenticated(true);
    } else {
      setIsErrorModalOpen(true);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Connexion
            </h2>
            <div>
              <label
                htmlFor="username"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                value={formInputs.username}
                onChange={(e) =>
                  setFormInputs({ ...formInputs, username: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Entrer votre nom d'utilisateur"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={formInputs.password}
                onChange={(e) =>
                  setFormInputs({ ...formInputs, password: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Entrer votre mot de passe"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!formInputs.username || !formInputs.password}
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
      <ErrorModal isOpen={isErrorModalOpen} setIsOpen={setIsErrorModalOpen} />
    </>
  );
};
export default Login;
