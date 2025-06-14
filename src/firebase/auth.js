import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';
import apiService from '../services/api';

export const registerUser = async (email, password, userData) => {
  try {
    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update Firebase profile
    await updateProfile(user, {
      displayName: userData.name
    });
    
    // Register user in backend
    const backendResponse = await apiService.register({
      name: userData.name,
      email: userData.email,
      password: password,
      role: userData.role || 'customer'
    });
    
    // Save user data to Firestore with backend token
    await setDoc(doc(db, 'users', user.uid), {
      name: userData.name,
      email: userData.email,
      role: userData.role || 'customer',
      backendToken: backendResponse.access_token,
      backendUserId: backendResponse.user.id,
      createdAt: new Date().toISOString()
    });
    
    // Set token for API calls
    apiService.setToken(backendResponse.access_token);
    
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    // Login to Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Login to backend
    const backendResponse = await apiService.login({
      email: email,
      password: password
    });
    
    // Update Firestore with new token
    await setDoc(doc(db, 'users', user.uid), {
      backendToken: backendResponse.access_token,
      backendUserId: backendResponse.user.id,
      lastLogin: new Date().toISOString()
    }, { merge: true });
    
    // Set token for API calls
    apiService.setToken(backendResponse.access_token);
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    apiService.setToken(null);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};