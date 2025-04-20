// @ts-nocheck
// @ts-ignore
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
// @ts-ignore
// @ts-nocheck
import { useNavigate } from 'react-router-dom';

export default function PendingApproval() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.approved) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // @ts-ignore
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Account Pending Approval</h1>
        <p className="mb-6">
          Your account is awaiting administrator approval. You'll receive an email
          once your account has been activated.
        </p>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}