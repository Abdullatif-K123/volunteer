import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Volunteer from "./pages/Volunteer";
import Participant from "./pages/Participant";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/volunteer/:id" element={<Volunteer />} />
        <Route path="/participant/:id" element={<Participant />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
