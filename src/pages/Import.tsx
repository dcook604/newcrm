import  { useState, ChangeEvent } from 'react';
import { FileText, Upload, CheckCircle, AlertTriangle, Building, User, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Unit, Owner, Tenant } from '../types';

type ImportType = 'units' | 'owners' | 'tenants';

export default function Import() {
  const { units, addUnit, owners, addOwner, tenants, addTenant } = useData();
  const [importType, setImportType] = useState<ImportType>('units');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string[][]>([]);
  const [importResult, setImportResult] = useState<{
    success: number;
    errors: number;
    messages: string[];
  } | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseCSV(selectedFile);
      setImportResult(null);
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const text = event.target.result as string;
        const rows = text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
        setPreview(rows.slice(0, 6)); // First 6 rows (including header)
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        const text = event.target.result as string;
        const rows = text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
        const header = rows[0];
        const dataRows = rows.slice(1).filter(row => row.length > 1 && row.some(cell => cell !== ''));
        
        const result = {
          success: 0,
          errors: 0,
          messages: [] as string[]
        };

        if (importType === 'units') {
          importUnits(header, dataRows, result);
        } else if (importType === 'owners') {
          importOwners(header, dataRows, result);
        } else if (importType === 'tenants') {
          importTenants(header, dataRows, result);
        }

        setImportResult(result);
        setIsImporting(false);
      }
    };
    
    reader.readAsText(file);
  };

  const importUnits = (header: string[], dataRows: string[][], result: { success: number; errors: number; messages: string[] }) => {
    // Define expected headers for units
    const expectedHeaders = ['number', 'floor', 'size', 'bedrooms', 'bathrooms', 'lockers', 'parkingSpots', 'bikeStorage'];
    
    // Validate header
    if (!validateHeaders(header, expectedHeaders, result)) return;
    
    const numberIndex = header.indexOf('number');
    
    // Process each row
    dataRows.forEach((row, rowIndex) => {
      try {
        if (row.length < expectedHeaders.length) {
          throw new Error(`Row ${rowIndex + 2} has too few columns`);
        }

        const unitNumber = row[numberIndex];
        
        // Check if unit already exists
        if (units.some(u => u.number === unitNumber)) {
          throw new Error(`Unit with number ${unitNumber} already exists`);
        }
        
        // Create unit object
        const unit: Omit<Unit, 'id'> = {
          number: unitNumber,
          floor: row[header.indexOf('floor')],
          size: parseInt(row[header.indexOf('size')]) || 0,
          bedrooms: parseInt(row[header.indexOf('bedrooms')]) || 0,
          bathrooms: parseInt(row[header.indexOf('bathrooms')]) || 0,
          lockers: parseInt(row[header.indexOf('lockers')]) || 0,
          parkingSpots: parseInt(row[header.indexOf('parkingSpots')]) || 0,
          bikeStorage: parseInt(row[header.indexOf('bikeStorage')]) || 0
        };
        
        // Add unit
        addUnit({ ...unit, id: Date.now().toString() + rowIndex });
        result.success++;
      } catch (error) {
        result.errors++;
        result.messages.push((error as Error).message);
      }
    });
  };

  const importOwners = (header: string[], dataRows: string[][], result: { success: number; errors: number; messages: string[] }) => {
    // Define expected headers for owners
    const expectedHeaders = ['firstName', 'lastName', 'email', 'phone', 'unitNumber', 'mailingAddress', 'hasDog', 'hasCat'];
    
    // Validate header
    if (!validateHeaders(header, expectedHeaders, result)) return;
    
    // Process each row
    dataRows.forEach((row, rowIndex) => {
      try {
        if (row.length < expectedHeaders.length) {
          throw new Error(`Row ${rowIndex + 2} has too few columns`);
        }

        const unitNumber = row[header.indexOf('unitNumber')];
        const unit = units.find(u => u.number === unitNumber);
        
        if (!unit) {
          throw new Error(`Unit with number ${unitNumber} does not exist`);
        }
        
        // Check if owner already exists for this unit
        if (owners.some(o => o.unitId === unit.id)) {
          throw new Error(`An owner already exists for unit ${unitNumber}`);
        }
        
        // Create owner object
        const owner: Omit<Owner, 'id'> = {
          firstName: row[header.indexOf('firstName')],
          lastName: row[header.indexOf('lastName')],
          email: row[header.indexOf('email')],
          phone: row[header.indexOf('phone')],
          unitId: unit.id,
          mailingAddress: row[header.indexOf('mailingAddress')],
          hasDog: row[header.indexOf('hasDog')].toLowerCase() === 'true',
          hasCat: row[header.indexOf('hasCat')].toLowerCase() === 'true'
        };
        
        // Add owner
        addOwner({ ...owner, id: Date.now().toString() + rowIndex });
        result.success++;
      } catch (error) {
        result.errors++;
        result.messages.push((error as Error).message);
      }
    });
  };

  const importTenants = (header: string[], dataRows: string[][], result: { success: number; errors: number; messages: string[] }) => {
    // Define expected headers for tenants
    const expectedHeaders = ['firstName', 'lastName', 'email', 'phone', 'unitNumber', 'leaseStart', 'leaseEnd', 'hasDog', 'hasCat'];
    
    // Validate header
    if (!validateHeaders(header, expectedHeaders, result)) return;
    
    // Process each row
    dataRows.forEach((row, rowIndex) => {
      try {
        if (row.length < expectedHeaders.length) {
          throw new Error(`Row ${rowIndex + 2} has too few columns`);
        }

        const unitNumber = row[header.indexOf('unitNumber')];
        const unit = units.find(u => u.number === unitNumber);
        
        if (!unit) {
          throw new Error(`Unit with number ${unitNumber} does not exist`);
        }
        
        // Create tenant object
        const tenant: Omit<Tenant, 'id'> = {
          firstName: row[header.indexOf('firstName')],
          lastName: row[header.indexOf('lastName')],
          email: row[header.indexOf('email')],
          phone: row[header.indexOf('phone')],
          unitId: unit.id,
          leaseStart: row[header.indexOf('leaseStart')],
          leaseEnd: row[header.indexOf('leaseEnd')],
          hasDog: row[header.indexOf('hasDog')].toLowerCase() === 'true',
          hasCat: row[header.indexOf('hasCat')].toLowerCase() === 'true'
        };
        
        // Add tenant
        addTenant({ ...tenant, id: Date.now().toString() + rowIndex });
        result.success++;
      } catch (error) {
        result.errors++;
        result.messages.push((error as Error).message);
      }
    });
  };

  const validateHeaders = (
    header: string[], 
    expectedHeaders: string[], 
    result: { success: number; errors: number; messages: string[] }
  ): boolean => {
    const missingHeaders = expectedHeaders.filter(h => !header.includes(h));
    
    if (missingHeaders.length > 0) {
      result.errors++;
      result.messages.push(`Missing required headers: ${missingHeaders.join(', ')}`);
      return false;
    }
    
    return true;
  };

  const getTemplateContent = (): string => {
    if (importType === 'units') {
      return 'number,floor,size,bedrooms,bathrooms,lockers,parkingSpots,bikeStorage\n101,1,950,2,1,1,1,0\n102,1,1200,3,2,1,2,1';
    } else if (importType === 'owners') {
      return 'firstName,lastName,email,phone,unitNumber,mailingAddress,hasDog,hasCat\nJohn,Smith,john@example.com,555-123-4567,101,123 Main St,true,false';
    } else { // tenants
      return 'firstName,lastName,email,phone,unitNumber,leaseStart,leaseEnd,hasDog,hasCat\nSarah,Davis,sarah@example.com,555-987-6543,101,2023-01-01,2023-12-31,false,true';
    }
  };

  const downloadTemplate = () => {
    const content = getTemplateContent();
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${importType}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Import Data</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select Import Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setImportType('units')}
                className={`flex items-center justify-center p-4 border rounded-md ${
                  importType === 'units' 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-gray-300 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <Building className="mr-2 h-5 w-5" /> Units
              </button>
              <button
                onClick={() => setImportType('owners')}
                className={`flex items-center justify-center p-4 border rounded-md ${
                  importType === 'owners' 
                    ? 'border-secondary bg-secondary/10 text-secondary' 
                    : 'border-gray-300 hover:border-secondary/50 hover:bg-secondary/5'
                }`}
              >
                <User className="mr-2 h-5 w-5" /> Owners
              </button>
              <button
                onClick={() => setImportType('tenants')}
                className={`flex items-center justify-center p-4 border rounded-md ${
                  importType === 'tenants' 
                    ? 'border-accent bg-accent/10 text-accent' 
                    : 'border-gray-300 hover:border-accent/50 hover:bg-accent/5'
                }`}
              >
                <Users className="mr-2 h-5 w-5" /> Tenants
              </button>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Download Template</h2>
            <p className="text-gray-600 mb-4">
              Start with our template CSV file to ensure your data is formatted correctly.
            </p>
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Download {importType} template
            </button>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload CSV File</h2>
            <div className="max-w-xl">
              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none">
                <span className="flex flex-col items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1613244470042-e69e8ccb303a?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxjc3YlMjBmaWxlJTIwaWNvbiUyMGRvY3VtZW50JTIwdXBsb2FkfGVufDB8fHx8MTc0NTE2NjI0Mnww&ixlib=rb-4.0.3"
                    alt="CSV file icon" 
                    className="w-12 h-12 object-contain mb-2"
                  />
                  <span className="font-medium text-gray-600">
                    {file ? file.name : "Drop CSV file here or click to browse"}
                  </span>
                  <span className="text-xs text-gray-500">
                    Only CSV files allowed
                  </span>
                </span>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
          {preview.length > 0 && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {preview[0].map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2">Showing first 5 rows only</p>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleImport}
                  disabled={isImporting}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    importType === 'units' ? 'bg-primary hover:bg-primary-hover' : 
                    importType === 'owners' ? 'bg-secondary hover:bg-secondary-hover' : 
                    'bg-accent hover:bg-accent-hover'
                  }`}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isImporting ? 'Importing...' : `Import ${importType}`}
                </button>
              </div>
            </div>
          )}
          
          {importResult && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Import Results</h2>
              <div className="p-4 rounded-md bg-gray-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {importResult.errors === 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">
                      {importResult.errors === 0 
                        ? 'Import completed successfully' 
                        : 'Import completed with errors'}
                    </h3>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{importResult.success} records imported successfully</p>
                      {importResult.errors > 0 && (
                        <p>{importResult.errors} records failed to import</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {importResult.messages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-800">Error details:</h4>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {importResult.messages.slice(0, 5).map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                      {importResult.messages.length > 5 && (
                        <li>...and {importResult.messages.length - 5} more errors</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 