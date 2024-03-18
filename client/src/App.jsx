import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
