interface Location {
   country: string;
   city: string;
   street: string;
 }
// export type TypeClient={
//    id: string;
//    name: string;
//    reg_no: string;
//    vat: string;
//    pan: string;
//    business_type: string;
//    username: string;
//    email: string;
//    phone: string;
//    master_key: string;
//    package_id: string;
//    join_date: string;
//    package_expire_date: string;
//    client_code: string;
//    location: Location;
//    verification_status: string;
// }

export type TypePartner ={
   name: string;
   username: string;
   password: string;
   reg_no: string;
   vat_no: string;
   pan_no: string;
   business_type: string;
   email: string;
   country_code: string;
   phone_number: string;
   master_key: string;
   package_id: string;
   join_date: string;
   package_expire_date: string;
   identity_code: string;
   location: Location;
   verification_status: string;
   description?: string;
   profile_photo?: string;
   cover_photo?: string;
}

export type TypeRestaurantEmployee ={
   username: string;
   password: string; // Make sure to hash the password before inserting
   email: string;
   role_code: string;
   country_code: string;
   phone_number: string ;
   location: Location;
}