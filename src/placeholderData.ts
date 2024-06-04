import { TypePartner, TypeRestaurantEmployee } from "./types/client";
export const ClientDemoData:TypePartner = {
  // name: 'masster',
  // username: 'JohnDoe',
  // reg_no: 'REG123456',
  // vat_no: 'VAT987654',
  // pan_no: 'PAN321098',
  // business_type: 'Restaurant',
  // email: 'john.doe@example.com',
  // country_code: 'US',
  // master_key: 'asdfa',
  // phone_number: '1010201',
  // package_id: 'PKG001',
  // join_date: 'asdf',
  // package_expire_date: '2023-12-31 23:59:59+00',
  // identity_code: 'ID123456',
  // location:{
  //   country: 'United States',
  //   city: 'New York',
  //   street: '123 Main St',
  // },
  // verification_status: 'Active',
  // description: 'Delicious food served here.',
  // profile_photo: 'https://example.com/profile.jpg',
  // cover_photo: 'https://example.com/cover.jpg' ,
    name: 'ChefMaster',
    username: 'ChefMaximus',
    password: 'dummypwd',
    reg_no: 'REG789012',
    vat_no: 'VAT765432',
    pan_no: 'PAN234567',
    business_type: 'Cafe',
    email: 'chef.maximus@example.com',
    country_code: 'CA',
    master_key: 'ghjkl',
    phone_number: '5551212',
    package_id: 'PKG002',
    join_date: '2023-04-01 00:00:00+00',
    package_expire_date: '2024-05-31 23:59:59+00',
    identity_code: 'ID234567',
    location: {
      country: 'Canada',
      city: 'Toronto',
      street: '456 Elm St'
    },
    verification_status: 'Pending',
    description: 'Serving fresh pastries and coffee.',
    profile_photo: 'https://example.com/chefmax.jpg',
    cover_photo: 'https://example.com/cafe.jpg'
};

 export const RestaurantEmployeeDemoData:TypeRestaurantEmployee={
    username: 'exampleUser',
    password: 'hashedPasswordExample', // Make sure to hash the password before inserting
    email: 'example@example.com',
    role_code: 'admin',
    country_code: 'US',
    phone_number: '1234567890',
    location:{
      country: 'USA',
      city: 'New York',
      street: '123 Main St'
    }
 }