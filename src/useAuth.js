import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; 

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the auth state listener
  }, []);

  return { user };
};

export default useAuth;
