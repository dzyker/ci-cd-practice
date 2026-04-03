import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  return (
    <div className="layout">
      <div className="bg" />
      <main className="container">
        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/about">О проекте</Link>
          <Link to="/contact">Контакты</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};
