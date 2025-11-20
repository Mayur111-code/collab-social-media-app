import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar/>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
