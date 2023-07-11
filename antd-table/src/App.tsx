import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import TableOne from "./pages/TableOne";
import { TableTwo } from "./pages/TableTwo";
import { TableCRUD } from "./pages/TableCRUD";
import { AppForm } from "./pages/AppForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TableOne" element={<TableOne />} />
        <Route path="/TableTwo" element={<TableTwo />} />
        <Route path="/TableCRUD" element={<TableCRUD />} />
        <Route path="/Form" element={<AppForm />} />
      </Routes>
    </>
  );
}

export default App;
