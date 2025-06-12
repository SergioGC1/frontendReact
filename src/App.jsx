import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CrearTarea from "./components/CrearTarea";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crear" element={<CrearTarea />} />
      </Routes>
    </Router>
  );
}

export default App;
