// @ts-nocheck
import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { AlertCircle } from 'lucide-react';

interface UserFormProps {
  user: User | null;
  onClose: () => void;
}

export default function UserForm({ user, onClose }: UserFormProps) {
  const { addUser, updateUser, error } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    role: user?.role || 'viewer',
    approved: user?.approved || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const validateForm = () => {
    setFormError(null);
    
    // Adding a new user requires a password
    if (!user && !formData.password) {
      setFormError('Password is required for new users');
      return false;
    }
    
    // If password is provided, check confirm password
    if (formData.password && formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }

    // If password is provided, check password strength
    if (formData.password && formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (user) {
      // Update existing user
      const updates: Partial<User> = {
        name: formData.name,
        email: formData.email,
        role: formData.role as 'admin' | 'manager' | 'viewer',
      };
      
      // Only update password if a new one is provided
      if (formData.password) {
        updates.password = formData.password;
      }
      
      updateUser(user.id, updates);
      onClose();
    } else {
      // Add new user
      addUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as 'admin' | 'manager' | 'viewer',
        approved: formData.approved,
      });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(error || formError) && (
        <div className="p-3 bg-accent/10 border border-accent/20 rounded flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-accent">{formError || error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {currentUser?.role === 'admin' && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="approved"
            name="approved"
            checked={formData.approved}
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="approved" className="ml-2 block text-sm text-gray-700">
            Approved
          </label>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="viewer">Viewer</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">
          {formData.role === 'admin' && 'Full access to all features, including user management.'}
          {formData.role === 'manager' && 'Can create, edit, and delete units, owners, and tenants.'}
          {formData.role === 'viewer' && 'Read-only access to view properties and data.'}
        </p>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          {user ? 'New Password (leave blank to keep current)' : 'Password'}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required={!user}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          {user ? 'Confirm New Password' : 'Confirm Password'}
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required={!user || formData.password !== ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary-hover"
        >
          {user ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
}
 