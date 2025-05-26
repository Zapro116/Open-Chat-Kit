import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  SETTINGS_ROUTE,
  SIGNUP_ROUTE,
  ADMIN_ROUTE,
} from "./utils/apiEndpoints";
import { KNOWLEDGE_BASE_ROUTE, PROJECT_ROUTE } from "./utils/contants";
import KnowledgeBaseDetails from "./components/KnowledgeBase/KnowledgeBaseDetails";
import ProjectDetails from "./components/Project/ProjectDetails";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={HOME_ROUTE} element={<LandingPage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={SIGNUP_ROUTE} element={<SignupPage />} />
        <Route path={ADMIN_ROUTE} element={<AdminPage />} />
        <Route
          path={`/${KNOWLEDGE_BASE_ROUTE}/:kb_id`}
          element={<KnowledgeBaseDetails />}
        />
        <Route
          path={`/${PROJECT_ROUTE}/:project_id`}
          element={<ProjectDetails />}
        />
        <Route path={SETTINGS_ROUTE} element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
