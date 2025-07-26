import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider'
import { Toaster } from '@/components/ui/toast'

// Pages
import Home from '@/pages/Home'
import Login from '@/pages/auth/Login'
import UserDashboard from '@/pages/user/Dashboard'
import BrandDashboard from '@/pages/brand/Dashboard'
import UserOnboarding from '@/pages/onboarding/UserOnboarding'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

// Protected Route Component
function ProtectedRoute({ children, userType }: { children: React.ReactNode, userType?: 'user' | 'brand' }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  // Here you could add userType validation if needed
  // For now, we'll allow both user types to access their respective dashboards
  
  return <>{children}</>
}

// Public Route Component (redirect if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
        </div>
      </div>
    )
  }
  
  if (user) {
    // Redirect based on user type - for now, we'll check metadata or default to user dashboard
    const userType = user.user_metadata?.user_type || 'fan'
    return <Navigate to={userType === 'brand' ? '/brand/dashboard' : '/user/dashboard'} replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              
              {/* Protected User Routes */}
              <Route path="/user/dashboard" element={
                <ProtectedRoute userType="user">
                  <UserDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/user/onboarding" element={
                <ProtectedRoute userType="user">
                  <UserOnboarding />
                </ProtectedRoute>
              } />
              
              {/* Protected Brand Routes */}
              <Route path="/brand/dashboard" element={
                <ProtectedRoute userType="brand">
                  <BrandDashboard />
                </ProtectedRoute>
              } />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Global Toast Notifications */}
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App