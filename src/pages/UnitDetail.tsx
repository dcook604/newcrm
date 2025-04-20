import  { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Building, Edit, Trash, User, Users, Plus, Lock, Car, Bike, Dog, Cat } from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';
import UnitForm from '../components/UnitForm';
import PersonForm from '../components/PersonForm';
import { Unit, Owner, Tenant } from '../types';

export default function UnitDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    units, owners, tenants, 
    updateUnit, deleteUnit, 
    addOwner, updateOwner, deleteOwner,
    addTenant, updateTenant, deleteTenant 
  } = useData();
  
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | undefined>();
  
  const unit = units.find(u => u.id === id);
  const owner = owners.find(o => o.unitId === id);
  const unitTenants = tenants.filter(t => t.unitId === id);
  
  if (!unit) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Unit not found</p>
        <Link to="/units" className="text-primary hover:underline mt-2 inline-block">
          Back to Units
        </Link>
      </div>
    );
  }

  const handleUnitUpdate = (updatedUnit: Unit) => {
    updateUnit({ ...updatedUnit, id: unit.id });
    setIsUnitModalOpen(false);
  };

  const handleUnitDelete = () => {
    if (window.confirm('Are you sure you want to delete this unit? This will also remove associated owners and tenants.')) {
      deleteUnit(unit.id);
      navigate('/units');
    }
  };

  const handleOwnerSubmit = (data: Owner) => {
    if (owner) {
      updateOwner({ ...data, id: owner.id });
    } else {
      addOwner({ ...data, unitId: unit.id });
    }
    setIsOwnerModalOpen(false);
  };

  const handleOwnerDelete = () => {
    if (owner && window.confirm('Are you sure you want to delete this owner?')) {
      deleteOwner(owner.id);
    }
  };

  const handleTenantSubmit = (data: Tenant) => {
    if (editingTenant) {
      updateTenant({ ...data, id: editingTenant.id });
    } else {
      addTenant({ ...data, unitId: unit.id });
    }
    setIsTenantModalOpen(false);
    setEditingTenant(undefined);
  };

  const handleTenantDelete = (tenantId: string) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      deleteTenant(tenantId);
    }
  };

  const openTenantModal = (tenant?: Tenant) => {
    setEditingTenant(tenant);
    setIsTenantModalOpen(true);
  };

  // Pet badge component
  const PetBadges = ({ hasCat, hasDog }: { hasCat: boolean; hasDog: boolean }) => {
    if (!hasCat && !hasDog) return null;
    
    return (
      <div className="flex space-x-2 mt-2">
        {hasDog && (
          <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
            <Dog className="w-3 h-3" />
            <span>Dog</span>
          </div>
        )}
        {hasCat && (
          <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
            <Cat className="w-3 h-3" />
            <span>Cat</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/units" className="text-primary hover:underline inline-flex items-center">
          ← Back to Units
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-glass p-4 sm:p-6 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Building className="w-6 h-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Unit {unit.number}</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsUnitModalOpen(true)}
              className="p-2 text-primary hover:bg-primary/10 rounded-full"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleUnitDelete}
              className="p-2 text-accent hover:bg-accent/10 rounded-full"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-primary">Unit Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Floor:</span>
                  <span>{unit.floor}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Size:</span>
                  <span>{unit.size} sq ft</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span>{unit.bedrooms}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span>{unit.bathrooms}</span>
                </div>
              </div>

              <h3 className="text-md font-semibold mt-5 mb-3 text-primary">Storage & Parking</h3>
              <div className="grid grid-cols-3 gap-3 bg-glass/30 p-3 rounded-md">
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-md shadow-sm">
                  <Lock className="h-6 w-6 text-secondary mb-1" />
                  <span className="text-2xl font-bold">{unit.lockers}</span>
                  <span className="text-xs text-gray-600">{unit.lockers === 1 ? 'Locker' : 'Lockers'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-md shadow-sm">
                  <Car className="h-6 w-6 text-primary mb-1" />
                  <span className="text-2xl font-bold">{unit.parkingSpots}</span>
                  <span className="text-xs text-gray-600">Parking</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-md shadow-sm">
                  <Bike className="h-6 w-6 text-accent mb-1" />
                  <span className="text-2xl font-bold">{unit.bikeStorage}</span>
                  <span className="text-xs text-gray-600">Bike Storage</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-secondary">Owner</h2>
                {owner ? (
                  <button
                    onClick={() => setIsOwnerModalOpen(true)}
                    className="text-primary hover:underline text-sm"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => setIsOwnerModalOpen(true)}
                    className="bg-secondary text-white px-3 py-1 rounded-md text-sm flex items-center space-x-1 hover:bg-secondary-hover"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                )}
              </div>
              
              {owner ? (
                <div className="border rounded-md p-4 border-secondary/20 bg-secondary/5">
                  <div className="flex justify-between">
                    <div className="flex items-start space-x-2">
                      <User className="w-5 h-5 text-secondary mt-0.5" />
                      <div>
                        <div className="font-medium">{owner.firstName} {owner.lastName}</div>
                        <div className="text-sm text-gray-600">{owner.email}</div>
                        <div className="text-sm text-gray-600">{owner.phone}</div>
                        <div className="text-sm text-gray-600 mt-1">{owner.mailingAddress}</div>
                        <PetBadges hasCat={owner.hasCat} hasDog={owner.hasDog} />
                      </div>
                    </div>
                    <button
                      onClick={handleOwnerDelete}
                      className="p-1 text-accent hover:bg-accent/10 rounded-full h-fit"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border rounded-md p-6 text-center text-gray-500 border-secondary/20">
                  No owner assigned
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-accent">Tenants</h2>
              <button
                onClick={() => openTenantModal()}
                className="bg-accent text-white px-3 py-1 rounded-md text-sm flex items-center space-x-1 hover:bg-accent-hover"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tenant</span>
              </button>
            </div>
            
            {unitTenants.length > 0 ? (
              <div className="space-y-4">
                {unitTenants.map((tenant) => (
                  <div key={tenant.id} className="border rounded-md p-4 border-accent/20 bg-accent/5">
                    <div className="flex justify-between">
                      <div className="flex items-start space-x-2">
                        <Users className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <div className="font-medium">{tenant.firstName} {tenant.lastName}</div>
                          <div className="text-sm text-gray-600">{tenant.email}</div>
                          <div className="text-sm text-gray-600">{tenant.phone}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Lease: {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                          </div>
                          <PetBadges hasCat={tenant.hasCat} hasDog={tenant.hasDog} />
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openTenantModal(tenant)}
                          className="p-1 text-primary hover:bg-primary/10 rounded-full"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleTenantDelete(tenant.id)}
                          className="p-1 text-accent hover:bg-accent/10 rounded-full"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center text-gray-500 border-accent/20">
                No tenants for this unit
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Edit Unit"
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
      >
        <UnitForm 
          unit={unit}
          onSubmit={handleUnitUpdate}
          onCancel={() => setIsUnitModalOpen(false)}
        />
      </Modal>

      <Modal
        title={owner ? "Edit Owner" : "Add Owner"}
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      >
        <PersonForm 
          type="owner"
          person={owner}
          units={units}
          onSubmit={handleOwnerSubmit}
          onCancel={() => setIsOwnerModalOpen(false)}
        />
      </Modal>

      <Modal
        title={editingTenant ? "Edit Tenant" : "Add Tenant"}
        isOpen={isTenantModalOpen}
        onClose={() => {
          setIsTenantModalOpen(false);
          setEditingTenant(undefined);
        }}
      >
        <PersonForm 
          type="tenant"
          person={editingTenant}
          units={units}
          onSubmit={handleTenantSubmit}
          onCancel={() => {
            setIsTenantModalOpen(false);
            setEditingTenant(undefined);
          }}
        />
      </Modal>
    </div>
  );
}
 