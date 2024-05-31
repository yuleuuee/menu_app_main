interface Location {
   country: string;
   city: string;
   street: string;
 }
export type TypeClient={
   id: string;
   name: string;
   reg_no: string;
   vat: string;
   pan: string;
   business_type: string;
   username: string;
   email: string;
   phone: string;
   master_key: string;
   package_id: string;
   join_date: string;
   package_expire_date: string;
   client_code: string;
   location: Location;
   branch: string;
   verification_status: string;
}