import  { useState, FormEvent } from 'react';
import { Owner, Tenant, Unit } from '../types';
import { Dog, Cat } from 'lucide-react';

interface PersonFormProps {
  type: 'owner' | 'tenant';
  person?: Owner | Tenant;
  units: Unit[];
  onSubmit: (data: Owner | Tenant) => void;
  onCancel: () => void;
}

export default function PersonForm({ type, person, units, onSubmit, onCancel }: PersonFormProps) {
  const isEdit = !!person;
  const initialData = person || {
    id: '',
    unitId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hasDog: false,
    hasCat: false,
    ...(type === 'owner' 
      ? { mailingAddress: '' } 
      : { leaseStart: '', leaseEnd: '' })
  };

  const [formData, setFormData] = useState<any>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const buttonColor = type === 'owner' ? 'bg-secondary hover:bg-secondary-hover' : 'bg-accent hover:bg-accent-hover';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <select
          name="unitId"
          value={formData.unitId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
          required
        >
          <option value="">Select a Unit</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              Unit {unit.number} - Floor {unit.floor}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div className="p-4 bg-glass/30 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pets</label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasDog"
              name="hasDog"
              checked={formData.hasDog}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <Dog className="h-5 w-5 text-primary" />
            <label htmlFor="hasDog" className="text-sm text-gray-700">
              Has Dog
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasCat"
              name="hasCat"
              checked={formData.hasCat}
              onChange={handleChange}
              className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
            />
            <Cat className="h-5 w-5 text-secondary" />
            <label htmlFor="hasCat" className="text-sm text-gray-700">
              Has Cat
            </label>
          </div>
        </div>
      </div>

      {type === 'owner' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Mailing Address</label>
          <textarea
            name="mailingAddress"
            value={(formData as Owner).mailingAddress}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            rows={3}
            required
          />
        </div>
      )}

      {type === 'tenant' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Lease Start</label>
            <input
              type="date"
              name="leaseStart"
              value={(formData as Tenant).leaseStart}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Lease End</label>
            <input
              type="date"
              name="leaseEnd"
              value={(formData as Tenant).leaseEnd}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-medium text-white ${buttonColor} rounded-md shadow-sm`}
        >
          {isEdit ? 'Update' : 'Create'} {type === 'owner' ? 'Owner' : 'Tenant'}
        </button>
      </div>
    </form>
  );
}
 