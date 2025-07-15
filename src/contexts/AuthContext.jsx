import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock API call - replace with real API
      const mockUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      // Generate mock JWT token
      const token = btoa(JSON.stringify({ 
        userId: foundUser.id, 
        email: foundUser.email, 
        role: foundUser.role,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);

      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${foundUser.role}`,
        className: "success-toast"
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        className: "error-toast"
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (existingUsers.find(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: userData.role || 'customer',
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Auto login after registration
      const token = btoa(JSON.stringify({ 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role,
        exp: Date.now() + 24 * 60 * 60 * 1000
      }));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      toast({
        title: "Account created!",
        description: "Welcome to ShopHub! You're now logged in.",
        className: "success-toast"
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        className: "error-toast"
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "See you next time!",
      className: "success-toast"
    });
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};