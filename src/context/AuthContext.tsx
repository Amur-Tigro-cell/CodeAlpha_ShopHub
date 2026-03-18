import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '../types';
import api from '../utils/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAIL'; payload: string }
  | { type: 'UPDATE_PROFILE_REQUEST' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: User }
  | { type: 'UPDATE_PROFILE_FAIL'; payload: string };

const initialState: AuthState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
    case 'UPDATE_PROFILE_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'UPDATE_PROFILE_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, userInfo: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [state.userInfo]);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      
      // Try API first, fallback to mock login
      try {
        const { data } = await api.post('/auth/login', { email, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        console.log('AuthContext - API login successful:', data);
      } catch (apiError) {
        console.log('AuthContext - API login failed, using mock login:', apiError);
        
        // Mock login - check if it's a registered account or use demo credentials
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Check if user exists in registered users
        const registeredUser = registeredUsers.find((user: any) => user.email === email && user.password === password);
        
        if (registeredUser) {
          const mockUser = {
            _id: registeredUser.id,
            name: registeredUser.name,
            email: registeredUser.email,
            role: 'user' as const,
            createdAt: registeredUser.createdAt,
            updatedAt: new Date().toISOString(),
            addresses: []
          };
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
          localStorage.setItem('userInfo', JSON.stringify(mockUser));
          console.log('AuthContext - Mock login successful with registered user:', mockUser);
        } else if (email === 'demo@example.com' && password === 'demo123') {
          const mockUser = {
            _id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            role: 'user' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addresses: []
          };
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
          localStorage.setItem('userInfo', JSON.stringify(mockUser));
          console.log('AuthContext - Mock login successful with demo user:', mockUser);
        } else if (email === 'admin@example.com' && password === 'admin123') {
          const mockAdmin = {
            _id: '2',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addresses: []
          };
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockAdmin });
          localStorage.setItem('userInfo', JSON.stringify(mockAdmin));
          console.log('AuthContext - Mock login successful with admin user:', mockAdmin);
        } else {
          dispatch({
            type: 'LOGIN_FAIL',
            payload: 'Invalid email or password. Please register first or check your credentials.',
          });
        }
      }
    } catch (error: any) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response?.data?.message || 'Login failed',
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: 'REGISTER_REQUEST' });
      
      // Try API first, fallback to mock registration
      try {
        const { data } = await api.post('/auth/register', { name, email, password });
        dispatch({ type: 'REGISTER_SUCCESS', payload: data });
        console.log('AuthContext - API registration successful:', data);
      } catch (apiError) {
        console.log('AuthContext - API registration failed, using mock registration:', apiError);
        
        // Mock registration for demo purposes
        if (name && email && password) {
          const mockUser = {
            _id: Date.now().toString(),
            name,
            email,
            password, // Store password for mock login
            role: 'user' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            addresses: []
          };
          
          // Save to localStorage for mock login
          const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          registeredUsers.push(mockUser);
          localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
          
          // Return user without password for state
          const userState = { ...mockUser };
          (userState as any).password = undefined;
          
          dispatch({ type: 'REGISTER_SUCCESS', payload: userState });
          localStorage.setItem('userInfo', JSON.stringify(userState));
          console.log('AuthContext - Mock registration successful:', userState);
        } else {
          dispatch({
            type: 'REGISTER_FAIL',
            payload: 'Please fill in all fields',
          });
        }
      }
    } catch (error: any) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response?.data?.message || 'Registration failed',
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userInfo');
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      dispatch({ type: 'UPDATE_PROFILE_REQUEST' });
      const { data } = await api.put('/auth/profile', userData);
      dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: data });
    } catch (error: any) {
      dispatch({
        type: 'UPDATE_PROFILE_FAIL',
        payload: error.response?.data?.message || 'Profile update failed',
      });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
