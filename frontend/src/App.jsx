import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import DatasetDetails from "./pages/DatasetDetails";
import Analysis from "./pages/Analysis";
import Documents from "./pages/Documents";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        {/* Public Routes */}

        <Route path="/" element={<Landing />} />
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>

          <Route element={<AppLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/datasets"
              element={<Datasets />}
            />
            <Route
              path="/documents"
              element={<Documents />}
            />

            <Route
              path="/datasets/:id"
              element={<DatasetDetails />}
            />

            <Route
              path="/analysis/:id"
              element={<Analysis />}
            />

            <Route
              path="/history"
              element={<History />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;