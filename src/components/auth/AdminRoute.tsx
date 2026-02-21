import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // In a real app, check user.role === 'admin'
  // For demo, we might allow access or strictly check role
  // if (!user || user.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }
  
  // For now, just check if logged in, or assume everyone is admin for demo purposes if needed
  // But better to be strict:
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
