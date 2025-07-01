import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ArticleDetailPage from "../pages/ArticleDetailPage";
import CreateArticlePage from "../pages/CreateArticlePage";
import EditArticlePage from "../pages/EditArticlePage";
import AdminDashboard from "../pages/AdminDashboard";




export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/admin/create" element={<CreateArticlePage />} />
        <Route path="/admin/edit/:id" element={<EditArticlePage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
