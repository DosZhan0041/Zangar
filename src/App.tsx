import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./pages/MainPage";
import Header from "./widgets/Header/header";
import { ApplicationsPage } from "./pages/ApplicationsPage";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<ApplicationsPage />} path="/applications" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
