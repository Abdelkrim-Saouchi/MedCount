import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateDrug from "./pages/CreateDrug";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { ErrorProvider } from "./context/ErrorContext";
import ErrorModal from "./components/ErrorModal";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            element={
              <Layout
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route path="/create_drug" element={<CreateDrug />} />
            </Route>
          </Route>
        </Routes>
        <ErrorModal />
      </QueryClientProvider>
    </ErrorProvider>
  );
}

export default App;
