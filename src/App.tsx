import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateDrug from "./pages/CreateDrug";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/create_drug" element={<CreateDrug />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
