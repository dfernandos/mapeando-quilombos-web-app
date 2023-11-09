import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);

        // Refresh the user's ID token to extend the session (before it expires)
        const token = await user.getIdToken();

        // Decode the token to get the expiration time
        const decodedToken = jwtDecode(token);

        // Calculate the time when the token expires in milliseconds
        const expirationTime = decodedToken.exp * 1000;

        // Calculate the time before the token expires to trigger a sign-out (e.g., 5 minutes before)
        const signOutTime = expirationTime - 5 * 60 * 1000; // 5 minutes before expiration

        // Set up a timer to sign out the user when the token expires
        const timer = setTimeout(() => {
          auth.signOut();
        }, signOutTime - Date.now());

        // Clean up the timer when the component unmounts
        return () => {
          clearTimeout(timer);
        };
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state listener
  }, []);

  return { user };
};

export default useAuth;
