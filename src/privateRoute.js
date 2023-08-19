import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true); 
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const unsub = auth.onAuthStateChanged((user) => {
        if (user) {
          setLoading(false);
          setSigned(true);
        } else {
          setLoading(false)
          setSigned(false)
        }
      });
      return unsub; // Cleanup function to unsubscribe from the auth state listener
    }

    checkLogin(); // Call the function to start checking login status
  }, []);

  if (loading) {
    return (
      <div></div>
    );
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return children;
}
