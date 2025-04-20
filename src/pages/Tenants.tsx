import  { useState } from 'react';
import { Plus, Search, Users, Building, Calendar, Dog, Cat } from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';
import PersonForm from '../components/PersonForm';
import { Link } from 'react-router-dom';
import { Tenant } from '../types';

export default function Tenants() {
  const { tenants, units, addTenant, deleteTenant } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (data: Tenant) => {
    addTenant(data);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      deleteTenant(id);
    }
  };

  const getUnitNumber = (unitId: string) => {
    const unit = units.find(u => u.id === unitId);
    return unit ? unit.number : 'Unknown';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredTenants = tenants.filter(tenant => 
    tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Tenants</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-accent-hover"
        >
          <Plus className="w-5 h-5" />
          <span>Add Tenant</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tenants..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:border-primary focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTenants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No tenants found. Add a new tenant to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-glass">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lease</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-accent/10">
                          <Users className="h-5 w-5 text-accent" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {tenant.firstName} {tenant.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-primary mr-1" />
                        <Link to={`/units/${tenant.unitId}`} className="text-primary hover:text-primary-hover">
                          Unit {getUnitNumber(tenant.unitId)}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.email}</div>
                      <div className="text-sm text-gray-500">{tenant.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {tenant.hasDog && (
                          <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full">
                            <Dog className="w-4 h-4 mr-1" />
                            <span className="text-xs">Dog</span>
                          </div>
                        )}
                        {tenant.hasCat && (
                          <div className="flex items-center bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                            <Cat className="w-4 h-4 mr-1" />
                            <span className="text-xs">Cat</span>
                          </div>
                        )}
                        {!tenant.hasDog && !tenant.hasCat && (
                          <span className="text-sm text-gray-500">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-secondary mr-1" />
                        <div className="text-sm text-gray-900">
                          {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleDelete(tenant.id)}
                        className="text-accent hover:text-accent-hover"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        title="Add New Tenant"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <PersonForm 
          type="tenant"
          units={units}
          onSubmit={handleSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
 