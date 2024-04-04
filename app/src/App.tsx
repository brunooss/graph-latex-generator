import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GraphEditorPage } from "./pages/GraphEditorPage";
import { NewPage } from "./pages/NewPage";
import { CanvasPage } from "./pages/CanvasPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GraphEditorPage />} />
        <Route path="/nova-pagina" element={<NewPage />} />
        <Route path="/canvas-page" element={<CanvasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
