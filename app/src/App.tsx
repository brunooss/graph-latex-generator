import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditorPage } from "./pages/EditorPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import { MenuPage } from "./pages/MenuPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/welcome" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/editor/:graphId?" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
