import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/order" element={<Order />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
