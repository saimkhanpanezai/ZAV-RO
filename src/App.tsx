import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Account } from './pages/Account';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Waitlist } from './pages/Waitlist';
import { FAQ, SizeGuide, Privacy, Terms, Shipping, Returns } from './pages/Static';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { useEffect } from 'react';
import { useAuthStore } from './stores/auth';

const NotFound = () => <div className="container mx-auto py-20 px-4 text-center"><h1 className="text-6xl font-serif mb-4">404</h1><p className="text-xl">Page not found</p></div>;

function App() {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
