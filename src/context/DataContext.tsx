import  { createContext, useContext, useState, ReactNode } from 'react';
import { Unit, Owner, Tenant } from '../types';
import { units as initialUnits, owners as initialOwners, tenants as initialTenants } from '../data/mockData';

interface DataContextType {
  units: Unit[];
  owners: Owner[];
  tenants: Tenant[];
  addUnit: (unit: Unit) => void;
  updateUnit: (unit: Unit) => void;
  deleteUnit: (id: string) => void;
  addOwner: (owner: Owner) => void;
  updateOwner: (owner: Owner) => void;
  deleteOwner: (id: string) => void;
  addTenant: (tenant: Tenant) => void;
  updateTenant: (tenant: Tenant) => void;
  deleteTenant: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [owners, setOwners] = useState<Owner[]>(initialOwners);
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);

  const addUnit = (unit: Unit) => {
    setUnits([...units, { ...unit, id: Date.now().toString() }]);
  };

  const updateUnit = (updatedUnit: Unit) => {
    setUnits(units.map(unit => unit.id === updatedUnit.id ? updatedUnit : unit));
  };

  const deleteUnit = (id: string) => {
    setUnits(units.filter(unit => unit.id !== id));
    setOwners(owners.filter(owner => owner.unitId !== id));
    setTenants(tenants.filter(tenant => tenant.unitId !== id));
  };

  const addOwner = (owner: Owner) => {
    setOwners([...owners, { ...owner, id: Date.now().toString() }]);
  };

  const updateOwner = (updatedOwner: Owner) => {
    setOwners(owners.map(owner => owner.id === updatedOwner.id ? updatedOwner : owner));
  };

  const deleteOwner = (id: string) => {
    setOwners(owners.filter(owner => owner.id !== id));
  };

  const addTenant = (tenant: Tenant) => {
    setTenants([...tenants, { ...tenant, id: Date.now().toString() }]);
  };

  const updateTenant = (updatedTenant: Tenant) => {
    setTenants(tenants.map(tenant => tenant.id === updatedTenant.id ? updatedTenant : tenant));
  };

  const deleteTenant = (id: string) => {
    setTenants(tenants.filter(tenant => tenant.id !== id));
  };

  return (
    <DataContext.Provider value={{
      units,
      owners,
      tenants,
      addUnit,
      updateUnit,
      deleteUnit,
      addOwner,
      updateOwner,
      deleteOwner,
      addTenant,
      updateTenant,
      deleteTenant
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
 