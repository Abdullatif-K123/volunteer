import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Volunteer from "./pages/Volunteer";
import Participant from "./pages/Participant";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/volunteer/:id" element={<Volunteer />} />
        <Route path="/participant/:id" element={<Participant />} />
      </Routes>
    </Router>
  );
}

export default App;
