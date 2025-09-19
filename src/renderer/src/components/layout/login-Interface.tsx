import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      onLoginSuccess();
    }
  }, [isAuthenticated, onLoginSuccess]);

  const handleLogin = async () => {
    clearError();

    if (!username || !password) {
      return;
    }

    try {
      await login({ username, password });
      onLoginSuccess();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen flex items-center justify-center p-6 font-sans relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="glass-effect rounded-3xl modern-shadow w-full max-w-md p-8 z-10 relative">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#334155] to-[#0f172a] rounded-2xl mx-auto mb-4 flex items-center justify-center modern-shadow">
            <i className="fas fa-cash-register text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">CentroERP POS</h1>
          <p className="text-gray-600 text-sm">Point of Sale for Traders</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-4 pl-12 bg-white/80 border border-white/40 rounded-xl shadow-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 pl-12 pr-12 bg-white/80 border border-white/40 rounded-xl shadow-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-accent bg-white/80 border-gray-300 rounded focus:ring-accent focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <span className="text-sm text-accent hover:text-accent/80 font-medium transition-all cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-[#334155] to-[#0f172a] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 modern-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="space-y-3"></div>

        <div className="text-center mt-8 space-y-3">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <span className="text-accent hover:text-accent/80 font-medium transition-all"> Sign up here</span>
          </p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <span className="hover:text-gray-700 transition-all cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-700 transition-all cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-700 transition-all cursor-pointer">Support</span>
          </div>
        </div>
      </div>

      {/* Fixed Right Panel on Desktop Only */}
      <div className="hidden md:block fixed right-60 top-1/2 transform -translate-y-1/2 z-20">
        <div className="glass-effect rounded-2xl p-8 w-80 modern-shadow">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-shopping-cart text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">CentroERP POS</h3>
              <p className="text-gray-600 text-sm">Simple Point of Sale for Traders</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mt-1">
                  <i className="fas fa-barcode text-emerald-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Barcode Scanning</h4>
                  <p className="text-xs text-gray-600">Quick product scanning and checkout</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                  <i className="fas fa-receipt text-blue-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Receipt Printing</h4>
                  <p className="text-xs text-gray-600">Generate and print customer receipts</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                  <i className="fas fa-credit-card text-purple-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Payment Processing</h4>
                  <p className="text-xs text-gray-600">Accept cash and card payments</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/10 to-blue-100/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-primary">POS Ready</span>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-600">System connected to backend</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="glass-effect rounded-2xl p-8 text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Signing you in...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
