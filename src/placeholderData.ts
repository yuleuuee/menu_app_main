import { TypeClient } from "./types/client";
export const ClientDemoData:TypeClient = {
   id: 'uniqueId1',
   name: 'John Doe',
   reg_no: '1234567890',
   vat: 'VAT123456789',
   pan: 'PAN123456789Q',
   business_type: 'Service',
   username: 'johndoe',
   email: 'john.doe@example.com',
   phone: '+1234567890',
   master_key: 'masterKey123',
   package_id: 'PKG001',
   join_date: '2023-01-01',
   package_expire_date: '2024-01-01',
   client_code: 'CLT001',
   location: {
     country: 'CountryName',
     city: 'CityName',
     street: 'StreetName'
   },
   branch: 'BranchName',
   verification_status: 'Verified'
 };