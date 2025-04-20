import  { useState, FormEvent } from 'react';
import { Unit } from '../types';

interface UnitFormProps {
  unit?: Unit;
  onSubmit: (data: Unit) => void;
  onCancel: () => void;
}

export default function UnitForm({ unit, onSubmit, onCancel }: UnitFormProps) {
  const isEdit = !!unit;
  const initialData = unit || {
    id: '',
    number: '',
    floor: '',
    size: 0,
    bedrooms: 1,
    bathrooms: 1,
    lockers: 0,
    parkingSpots: 0,
    bikeStorage: 0
  };

  const [formData, setFormData] = useState<Unit>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'size' || name === 'bedrooms' || name === 'bathrooms' || 
               name === 'lockers' || name === 'parkingSpots' || name === 'bikeStorage'
        ? parseInt(value) || 0
        : value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit Number</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Floor</label>
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Size (sq ft)</label>
        <input
          type="number"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
          required
          min="0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            required
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            required
            min="0"
          />
        </div>
      </div>

      <h3 className="text-md font-medium text-primary mt-2">Storage Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-glass/30 p-4 rounded-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Lockers</label>
          <input
            type="number"
            name="lockers"
            value={formData.lockers}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Parking Spots</label>
          <input
            type="number"
            name="parkingSpots"
            value={formData.parkingSpots}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bike Storage</label>
          <input
            type="number"
            name="bikeStorage"
            value={formData.bikeStorage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-primary focus:ring-1 focus:ring-primary"
            min="0"
          />
        </div>
      </div>

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
          className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md shadow-sm hover:bg-secondary-hover"
        >
          {isEdit ? 'Update' : 'Create'} Unit
        </button>
      </div>
    </form>
  );
}
 