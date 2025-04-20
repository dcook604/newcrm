import  { Building, User, Users, Lock, Car, Bike, Dog, Cat, Upload, Download } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import UnitCard from '../components/UnitCard';

export default function Dashboard() {
  const { units, owners, tenants } = useData();
  
  const getOwnerForUnit = (unitId: string) => {
    return owners.find(owner => owner.unitId === unitId);
  };
  
  const getTenantsForUnit = (unitId: string) => {
    return tenants.filter(tenant => tenant.unitId === unitId);
  };
  
  // Calculate totals
  const totalLockers = units.reduce((total, unit) => total + unit.lockers, 0);
  const totalParkingSpots = units.reduce((total, unit) => total + unit.parkingSpots, 0);
  const totalBikeStorage = units.reduce((total, unit) => total + unit.bikeStorage, 0);
  const totalDogs = owners.filter(o => o.hasDog).length + tenants.filter(t => t.hasDog).length;
  const totalCats = owners.filter(o => o.hasCat).length + tenants.filter(t => t.hasCat).length;
  
  const stats = [
    { label: 'Total Units', value: units.length, icon: <Building className="w-8 h-8 text-primary" /> },
    { label: 'Total Owners', value: owners.length, icon: <User className="w-8 h-8 text-secondary" /> },
    { label: 'Total Tenants', value: tenants.length, icon: <Users className="w-8 h-8 text-accent" /> },
  ];

  const amenityStats = [
    { label: 'Lockers', value: totalLockers, icon: <Lock className="w-6 h-6 text-secondary" /> },
    { label: 'Parking Spots', value: totalParkingSpots, icon: <Car className="w-6 h-6 text-primary" /> },
    { label: 'Bike Storage', value: totalBikeStorage, icon: <Bike className="w-6 h-6 text-accent" /> },
  ];

  const petStats = [
    { label: 'Dogs', value: totalDogs, icon: <Dog className="w-6 h-6 text-primary" /> },
    { label: 'Cats', value: totalCats, icon: <Cat className="w-6 h-6 text-secondary" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <img 
          src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/2c6bc4ec-fdb0-41b1-b29b-c3241b5cb100/public" 
          alt="Modern apartment building with blue glass and red and yellow accents" 
          className="w-full h-72 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center rounded-xl">
          <div className="text-white p-6">
            <h1 className="text-3xl font-bold">Strata Management</h1>
            <p className="text-lg mt-2">Manage your properties efficiently</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            {stat.icon}
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/import" className="flex flex-col items-center justify-center p-4 bg-glass/30 rounded-md hover:bg-glass/50 transition-colors">
            <Upload className="h-8 w-8 text-primary mb-2" />
            <span className="text-center font-medium">Import Data</span>
            <span className="text-xs text-center text-gray-500 mt-1">Upload CSV files</span>
          </Link>
          <Link to="/units" className="flex flex-col items-center justify-center p-4 bg-glass/30 rounded-md hover:bg-glass/50 transition-colors">
            <Building className="h-8 w-8 text-secondary mb-2" />
            <span className="text-center font-medium">Manage Units</span>
            <span className="text-xs text-center text-gray-500 mt-1">View and edit units</span>
          </Link>
          <Link to="/owners" className="flex flex-col items-center justify-center p-4 bg-glass/30 rounded-md hover:bg-glass/50 transition-colors">
            <User className="h-8 w-8 text-accent mb-2" />
            <span className="text-center font-medium">Manage Owners</span>
            <span className="text-xs text-center text-gray-500 mt-1">View and edit owners</span>
          </Link>
          <Link to="/tenants" className="flex flex-col items-center justify-center p-4 bg-glass/30 rounded-md hover:bg-glass/50 transition-colors">
            <Users className="h-8 w-8 text-primary mb-2" />
            <span className="text-center font-medium">Manage Tenants</span>
            <span className="text-xs text-center text-gray-500 mt-1">View and edit tenants</span>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Building Statistics</h2>
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {amenityStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-glass/30 rounded-md">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-md font-semibold mb-3 text-primary border-t pt-4">Pet Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {petStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-glass/30 rounded-md">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5 border-t pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMHBhcmtpbmclMjBnYXJhZ2UlMjBsb2NrZXJzJTIwYmlrZSUyMHN0b3JhZ2V8ZW58MHx8fHwxNzQ1MTY1MTA4fDA&ixlib=rb-4.0.3&fit=fillmax&h=500&w=800" 
                  alt="Bicycle storage in apartment building" 
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-medium text-primary mb-2">Bike Storage</h3>
                <p className="text-gray-600">
                  Our building provides secure bike storage for residents. Each unit can be allocated bike storage spaces
                  for convenient and safe bicycle parking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Recent Units</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.slice(0, 6).map((unit) => (
          <UnitCard 
            key={unit.id} 
            unit={unit} 
            owner={getOwnerForUnit(unit.id)} 
            tenants={getTenantsForUnit(unit.id)} 
          />
        ))}
      </div>
    </div>
  );
}
 