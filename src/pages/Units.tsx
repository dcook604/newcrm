import  { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';
import UnitCard from '../components/UnitCard';
import Modal from '../components/Modal';
import UnitForm from '../components/UnitForm';
import { Unit } from '../types';

export default function Units() {
  const { units, owners, tenants, addUnit } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const getOwnerForUnit = (unitId: string) => {
    return owners.find(owner => owner.unitId === unitId);
  };
  
  const getTenantsForUnit = (unitId: string) => {
    return tenants.filter(tenant => tenant.unitId === unitId);
  };

  const handleSubmit = (data: Unit) => {
    addUnit(data);
    setIsModalOpen(false);
  };

  const filteredUnits = units.filter(unit => 
    unit.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.floor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Units</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-secondary-hover"
        >
          <Plus className="w-5 h-5" />
          <span>Add Unit</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center">
          <div className="relative flex-grow mb-3 md:mb-0 md:mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search units..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-1 text-gray-600 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {filteredUnits.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No units found. Add a new unit to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit) => (
            <UnitCard 
              key={unit.id} 
              unit={unit} 
              owner={getOwnerForUnit(unit.id)} 
              tenants={getTenantsForUnit(unit.id)} 
            />
          ))}
        </div>
      )}

      <Modal
        title="Add New Unit"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UnitForm 
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
 