import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import Navbar from '@/components/layout/Navbar'
import Home from '@/pages/Home'
import Login from '@/pages/Login/index'
import Dashboard from '@/pages/Dashboard/index'
import AdminPanel from '@/pages/AdminPanel/index'
import Unauthorized from '@/pages/Unauthorized'
import Page404 from '@/pages/Page404'

const AppRouter = () => {
  const { user, hasRole } = useAuthStore()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={user === null ? <Navigate to="/login" /> : <Dashboard />} />
        <Route
          path="/panel-admin"
          element={
            !user
              ? <Navigate to="/login" />
              : !hasRole('ADMIN')
                ? <Unauthorized />
                : <AdminPanel />
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
