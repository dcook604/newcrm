// @ts-nocheck
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import UserForm from '../components/UserForm';

export default function UserManagement() {
  const { users, updateUser, deleteUser } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setPendingUsers(users.filter(u => !u.approved));
    setActiveUsers(users.filter(u => u.approved));
  }, [users]);

  const handleApprove = async (userId) => {
    await updateUser(userId, { approved: true });
  };

  const handleReject = async (userId) => {
    await deleteUser(userId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
        {pendingUsers.length === 0 ? (
          <p>No pending approvals</p>
        ) : (
          <div className="grid gap-4">
            {pendingUsers.map(user => (
              <div key={user.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Active Users</h2>
        <div className="grid gap-4">
          {activeUsers.map(user => (
            <div key={user.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button 
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}