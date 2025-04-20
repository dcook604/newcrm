export  interface Unit {
  id: string;
  number: string;
  floor: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  lockers: number;
  parkingSpots: number;
  bikeStorage: number;
}

export interface Owner {
  id: string;
  unitId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mailingAddress: string;
  hasDog: boolean;
  hasCat: boolean;
}

export interface Tenant {
  id: string;
  unitId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leaseStart: string;
  leaseEnd: string;
  hasDog: boolean;
  hasCat: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'manager' | 'viewer';
  createdAt: string;
}
 