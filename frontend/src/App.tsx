import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompletePage from "./pages/OpenPage";
import OpenPage from "./pages/CompletePage";
//@ts-ignore
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/open" element={<OpenPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="*" element={<OpenPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
