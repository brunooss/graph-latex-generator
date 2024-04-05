import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MenuPage } from "./pages/MenuPage";
import { EditorPage } from "./pages/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/editor-page" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
