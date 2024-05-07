import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Menu, Typography } from "antd";
import Home from "./pages/Home";
import Order from "./pages/Order";
import DeployPackageTracker from "./pages/DeployPackageTracker";
import "./App.css";
import GenerateQRCode from "./pages/GenerateQRCode";
import AddPlaceForPackage from "./pages/AddPlaceForPackage";

function App() {
  return (
    <>
      <Typography.Title
        level={1}
        style={{ fontFamily: "Arial", color: "#F43255", textAlign: "center" }}
      >
        Blockchain Dropshipping
      </Typography.Title>
      <BrowserRouter>
        <Menu mode="horizontal" theme="dark" selectedKeys={[0]}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="deploy">
            <Link to="/deploy-package-tracker">Deploy Package Tracker</Link>
          </Menu.Item>
          <Menu.Item key="qr">
            <Link to="/generate-qr-code">Generate QR Code</Link>
          </Menu.Item>
          <Menu.Item key="addPlace">
            <Link to="/add-place-for-package">Add Place For Package</Link>
          </Menu.Item>
        </Menu>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route
            path="/deploy-package-tracker"
            element={<DeployPackageTracker />}
          />
          <Route path="/generate-qr-code" element={<GenerateQRCode />} />
          <Route
            path="/add-place-for-package"
            element={<AddPlaceForPackage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
