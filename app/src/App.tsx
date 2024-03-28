import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GraphEditorPage } from "./pages/GraphEditorPage";
import { NewPage } from "./pages/NewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GraphEditorPage />} />
        <Route path="/nova-pagina" element={<NewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
