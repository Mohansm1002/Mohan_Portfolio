import { Navigate, Route, Routes } from 'react-router-dom';
import PortfolioPage from './portfolio/PortfolioPage.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import ManageSkills from './admin/ManageSkills.jsx';
import ManageProjects from './admin/ManageProjects.jsx';
import ManageCertifications from './admin/ManageCertifications.jsx';
import ManageMessages from './admin/ManageMessages.jsx';
import ManageProfile from './admin/ManageProfile.jsx';
import { ADMIN_TOKEN_KEY } from './api/portfolioApi.js';
import './App.css';

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={(
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        )}
      >
        <Route path="skills" element={<ManageSkills />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="certifications" element={<ManageCertifications />} />
        <Route path="messages" element={<ManageMessages />} />
        <Route path="profile" element={<ManageProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
