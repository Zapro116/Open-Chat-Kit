import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "./utils/apiEndpoints";
import { KNOWLEDGE_BASE_ROUTE, PROJECT_ROUTE } from "./utils/contants";
import KnowledgeBaseDetails from "./components/KnowledgeBase/KnowledgeBaseDetails";
import ProjectDetails from "./components/Project/ProjectDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={HOME_ROUTE} element={<LandingPage />} />
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={SIGNUP_ROUTE} element={<SignupPage />} />
        <Route
          path={`/${KNOWLEDGE_BASE_ROUTE}/:kb_id`}
          element={<KnowledgeBaseDetails />}
        />
        <Route
          path={`/${PROJECT_ROUTE}/:project_id`}
          element={<ProjectDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
