import  { Building, User, Users, Lock, Car, Bike, Dog, Cat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Unit, Owner, Tenant } from '../types';

interface UnitCardProps {
  unit: Unit;
  owner?: Owner;
  tenants: Tenant[];
}

export default function UnitCard({ unit, owner, tenants }: UnitCardProps) {
  const hasPets = 
    (owner && (owner.hasDog || owner.hasCat)) || 
    tenants.some(tenant => tenant.hasDog || tenant.hasCat);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-primary">
      <div className="bg-glass p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Unit {unit.number}</h3>
          <Link 
            to={`/units/${unit.id}`} 
            className="text-primary hover:text-primary-hover font-medium"
          >
            Details
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm">
            <span className="font-medium text-gray-600">Floor:</span> {unit.floor}
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">Size:</span> {unit.size} sq ft
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">Bedrooms:</span> {unit.bedrooms}
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">Bathrooms:</span> {unit.bathrooms}
          </div>
        </div>
        
        <div className="mt-3 border-t pt-3">
          <div className="flex justify-between">
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4 text-secondary" />
              <span className="text-sm">{unit.lockers} {unit.lockers === 1 ? 'Locker' : 'Lockers'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Car className="w-4 h-4 text-primary" />
              <span className="text-sm">{unit.parkingSpots} Parking</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bike className="w-4 h-4 text-accent" />
              <span className="text-sm">{unit.bikeStorage} Bike</span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 border-t pt-3">
          {owner ? (
            <div className="flex items-start space-x-2">
              <User className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <div className="text-sm font-medium">{owner.firstName} {owner.lastName}</div>
                <div className="text-xs text-gray-600">{owner.email}</div>
                {(owner.hasDog || owner.hasCat) && (
                  <div className="flex mt-1 space-x-1">
                    {owner.hasDog && <Dog className="w-4 h-4 text-primary" />}
                    {owner.hasCat && <Cat className="w-4 h-4 text-secondary" />}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-accent flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>No owner assigned</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 border-t pt-3">
          {tenants.length > 0 ? (
            <div className="flex items-start space-x-2">
              <Users className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="text-sm font-medium">
                  {tenants.length === 1 
                    ? `${tenants[0].firstName} ${tenants[0].lastName}`
                    : `${tenants.length} tenants`}
                </div>
                {tenants.length === 1 && (
                  <div className="text-xs text-gray-600">{tenants[0].email}</div>
                )}
                {tenants.some(t => t.hasDog || t.hasCat) && (
                  <div className="flex mt-1 space-x-1">
                    {tenants.some(t => t.hasDog) && <Dog className="w-4 h-4 text-primary" />}
                    {tenants.some(t => t.hasCat) && <Cat className="w-4 h-4 text-secondary" />}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>No tenants</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 