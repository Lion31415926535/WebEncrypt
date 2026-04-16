import { Routes, Route } from "react-router";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Encrypt from "./pages/Encrypt";
import Cipher from "./pages/Cipher";
import MyCiphers from "./pages/MyCiphers";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/encrypt" element={<Encrypt />} />
          <Route path="/cipher/:id" element={<Cipher />} />
          <Route path="/my-ciphers" element={<MyCiphers />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
