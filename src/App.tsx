// @ts-nocheck
import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Units from './pages/Units';
import UnitDetail from './pages/UnitDetail';
import Owners from './pages/Owners';
import Tenants from './pages/Tenants';
import Import from './pages/Import';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UserManagement from './pages/UserManagement';
import Unauthorized from './pages/Unauthorized';
import PendingApproval from './pages/PendingApproval';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-glass">
            <Header />
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/pending-approval" element={<PendingApproval />} />
                
                {/* Protected routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/units" element={
                  <ProtectedRoute>
                    <Units />
                  </ProtectedRoute>
                } />
                <Route path="/units/:id" element={
                  <ProtectedRoute>
                    <UnitDetail />
                  </ProtectedRoute>
                } />
                <Route path="/owners" element={
                  <ProtectedRoute>
                    <Owners />
                  </ProtectedRoute>
                } />
                <Route path="/tenants" element={
                  <ProtectedRoute>
                    <Tenants />
                  </ProtectedRoute>
                } />
                <Route path="/import" element={
                  <ProtectedRoute>
                    <Import />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/user-management" element={
                  <ProtectedRoute requiredRole="admin">
                    <UserManagement />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <footer className="bg-primary text-white py-4">
              <div className="container mx-auto px-4 text-center text-sm">
                &copy; {new Date().getFullYear()} Strata Management System | Built with jdoodle.ai
              </div>
            </footer>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
 