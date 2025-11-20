import { Routes, Route, Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const App = () => {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
};

// tailwind, daisyUI , react-router, react-hot-toast
// todo : react-query aka tanstack query , axios

export default App;
