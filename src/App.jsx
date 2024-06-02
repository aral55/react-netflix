import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import NavBar from "./components/NavBar";

const App = () => {
  return (
     <>
<NavBar />
  <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/login" element={<Login />} /> 
    <Route path="/signup" element={<Signup />} /> 
    <Route path="/profile" element={<Profile />} /> 
    </Routes>
  </>
  );
};

export default App;
