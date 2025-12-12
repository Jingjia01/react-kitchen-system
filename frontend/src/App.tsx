import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//@ts-ignore
import OpenPage from "./pages/OpenPage";       
//@ts-ignore
import CompletePage from "./pages/CompletePage"; 
//@ts-ignore
import { SocketProvider } from "./SocketContext";
//@ts-ignore
import Header from "./components/Header";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/open" element={<OpenPage />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="*" element={<OpenPage />} /> 
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;