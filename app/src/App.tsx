import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MenuPage } from "./pages/MenuPage";
import { EditorPage } from "./pages/EditorPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/editor-page" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
