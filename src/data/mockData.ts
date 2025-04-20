import  { Unit, Owner, Tenant, User } from '../types';

// Initial data for the application
export const units: Unit[] = [
  {
    id: '1',
    number: '101',
    floor: '1',
    size: 950,
    bedrooms: 2,
    bathrooms: 1,
    lockers: 1,
    parkingSpots: 1,
    bikeStorage: 0
  },
  {
    id: '2',
    number: '102',
    floor: '1',
    size: 1200,
    bedrooms: 3,
    bathrooms: 2,
    lockers: 2,
    parkingSpots: 2,
    bikeStorage: 1
  },
  {
    id: '3',
    number: '201',
    floor: '2',
    size: 850,
    bedrooms: 1,
    bathrooms: 1,
    lockers: 1,
    parkingSpots: 1,
    bikeStorage: 1
  },
];

export const owners: Owner[] = [
  {
    id: '1',
    unitId: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    mailingAddress: '123 Main St, Anytown, CA 90210',
    hasDog: true,
    hasCat: false
  },
  {
    id: '2',
    unitId: '2',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-234-5678',
    mailingAddress: '456 Oak Ave, Somewhere, NY 10001',
    hasDog: false,
    hasCat: true
  },
  {
    id: '3',
    unitId: '3',
    firstName: 'Robert',
    lastName: 'Williams',
    email: 'robert.williams@example.com',
    phone: '555-345-6789',
    mailingAddress: '789 Pine Blvd, Nowhere, FL 33101',
    hasDog: false,
    hasCat: false
  },
];

export const tenants: Tenant[] = [
  {
    id: '1',
    unitId: '1',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah.davis@example.com',
    phone: '555-456-7890',
    leaseStart: '2023-01-01',
    leaseEnd: '2023-12-31',
    hasDog: false,
    hasCat: true
  },
  {
    id: '2',
    unitId: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    phone: '555-567-8901',
    leaseStart: '2023-03-15',
    leaseEnd: '2024-03-14',
    hasDog: true,
    hasCat: false
  },
];

export const users: User[] = [
  {
    id: '1',
    email: 'admin@strata.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    email: 'manager@strata.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    createdAt: '2023-02-01T00:00:00.000Z',
  },
  {
    id: '3',
    email: 'viewer@strata.com',
    password: 'viewer123',
    name: 'Viewer User',
    role: 'viewer',
    createdAt: '2023-03-01T00:00:00.000Z',
  }
];
 