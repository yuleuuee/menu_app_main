import { db } from '@vercel/postgres';
import { ConnectToClientDatabase } from '../db/clientdb';
import { TypePartner, TypeRestaurantEmployee } from '@/types/client';
import {generateUniqueString } from '../utils';
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

export type TypeAdmin={
   username:string;
   password: string;
}
export const RegisterClient = async (data:TypePartner)=>{
   try {      
      let admin:TypeAdmin = {
         username: data.username,
         password: 'enter password you have set during register.',
      };

      let dataSaved = await saveData(data);
      if(dataSaved){
         console.log("data saved successfully");
      }else{
         throw new Error("error registering");
      }
      return {success: true, payload:{admin}}
   
   } catch (error) {
      console.log(error)
      return {success: false, payload: 'error registering'}
   }
} 

async function saveData(data:TypePartner){
   let client = await db.connect();
   let rClient = await ConnectToClientDatabase();
   //insert partner data
   try {
      await client.query('Begin');
      try {
         await client.query('Begin');
         //create partner table if not exists
         await client.query(`
            CREATE TABLE IF NOT EXISTS partners (
               id SERIAL PRIMARY KEY,
               username VARCHAR(225) UNIQUE NOT NULL,
               reg_no VARCHAR(225) UNIQUE NOT NULL,
               vat_no VARCHAR(225),
               pan_no VARCHAR(225),
               business_type VARCHAR(225) NOT NULL,
               email VARCHAR(225) UNIQUE NOT NULL,
               country_code VARCHAR(5) NOT NULL,
               phone_number VARCHAR(10) UNIQUE NOT NULL,
               master_key VARCHAR(225) UNIQUE NOT NULL,
               package_id VARCHAR(225) NOT NULL,
               join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
               package_expire_date TIMESTAMP WITH TIME ZONE NOT NULL,
               identity_code VARCHAR(225) UNIQUE NOT NULL,
               country VARCHAR(225) NOT NULL,
               city VARCHAR(225) NOT NULL,
               street VARCHAR(225) NOT NULL,
               verification_status VARCHAR(225) NOT NULL
            );
         `)
      } catch (error) {
         console.error('Error creating partners table: ', error);
         await client.query('ROLLBACK');
         throw new Error('Failed to create partners table');
      }

      //inserting partner data
      let employeeTableName:string;
      try {
         // const masterkey = uuidv4().split('-').join("");
         // console.log("masterkey",masterkey);
         const partnerRes = await client.query(`
            INSERT INTO partners (username, reg_no, vat_no, pan_no, business_type, email, country_code, phone_number, master_key, package_id, join_date, package_expire_date, identity_code, country, city, street, verification_status) 
            VALUES('${data.username}','${data.reg_no}','${data.vat_no}','${data.pan_no}','${data.business_type}','${data.email}','${data.country_code}','${data.phone_number}','${data.master_key}', '${data.package_id}', CURRENT_TIMESTAMP, '${data.package_expire_date}', '${data.identity_code}', '${data.location.country}', '${data.location.city}', '${data.location.street}', '${data.verification_status}') RETURNING id;
         `);
         employeeTableName = `R0${partnerRes.rows[0].id}_employees`;//todo: need to sanitized this data to avoide injection attack
      } catch (error) {
         console.error('Error inserting partners data: ', error);
         await client.query('ROLLBACK');
         throw new Error('Failed inserting partners data');
      }
      await client.query('COMMIT');

      await rClient.query('BEGIN');
      //create respective employees table if not exists
      try {
         await rClient.query(`
            CREATE TABLE IF NOT EXISTS ${employeeTableName} (
               id SERIAL PRIMARY KEY,
               username VARCHAR(225) UNIQUE NOT NULL,
               password VARCHAR(225) UNIQUE NOT NULL,
               email VARCHAR(225) UNIQUE NOT NULL,
               role_code VARCHAR(225) NOT NULL,
               country_code VARCHAR(5) NOT NULL,
               phone_number VARCHAR(10) UNIQUE NOT NULL,
               join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
               country VARCHAR(225) NOT NULL,
               city VARCHAR(225) NOT NULL,
               street VARCHAR(225) NOT NULL
            );
         `)
         console.log("created employee table: ",employeeTableName)
      }catch (error) {
         console.error('Error creating employees table: ', error);
         await rClient.query('ROLLBACK');
         throw new Error('Failed to create employees table');
      }

      //insert employee data
      let adminId: number ; 
      try {
         const EmployeeRes = await rClient.query(`
            INSERT INTO ${employeeTableName} (username, password, email, role_code, country_code, phone_number, join_date, country, city, street) 
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, $7, $8, $9) RETURNING id;`,
            [data.username, data.password, data.email, "a#01", data.country_code, data.phone_number, data.location.country, data.location.city, data.location.street]);

         adminId = EmployeeRes.rows[0].id;
         console.log('Inserted employee with ID:', EmployeeRes.rows[0].id);
      } catch (err) {
         console.error('Error inserting employee:', err);
         throw new Error('Failed inserting employee data');
      }
      await rClient.query('COMMIT');

      // Proceed only if adminId is valid
      if (!adminId) {
         console.log("adminId: ",adminId);
         throw new Error('Employee insertion failed or did not return a valid adminId');
      }

      //create restaurant table
      try {
         await rClient.query(`
            CREATE TABLE IF NOT EXISTS restaurants (
               id SERIAL PRIMARY KEY,
               username VARCHAR(225) UNIQUE NOT NULL,
               reg_no VARCHAR(225) UNIQUE NOT NULL,
               vat_no VARCHAR(225),
               pan_no VARCHAR(225),
               business_type VARCHAR(225) NOT NULL,
               email VARCHAR(225) UNIQUE NOT NULL,
               country_code VARCHAR(5) NOT NULL,
               phone_number VARCHAR(10) UNIQUE NOT NULL,
               package_id VARCHAR(225) NOT NULL,
               join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
               package_expire_date TIMESTAMP WITH TIME ZONE NOT NULL,
               identity_code VARCHAR(225) UNIQUE NOT NULL,
               country VARCHAR(225) NOT NULL,
               city VARCHAR(225) NOT NULL,
               street VARCHAR(225) NOT NULL,
               verification_status VARCHAR(225) NOT NULL,
               description VARCHAR(225),
               profile_photo VARCHAR(225),
               cover_photo VARCHAR(225),
               admin_id INTEGER,
               FOREIGN KEY (admin_id) REFERENCES ${employeeTableName}(id)
            );
         `)
      } catch (error) {
         console.error('Error creating restaurants table: ', error);
         await rClient.query('ROLLBACK');
         throw new Error('Failed to create restaurants table');
      }

      //insert restaurant data
      try {
         let identitycode: string = employeeTableName.split('_')[0];
         await rClient.query(`
            INSERT INTO restaurants (username, reg_no, vat_no, pan_no, business_type, email, country_code, phone_number, package_id, join_date, package_expire_date, identity_code, country, city, street, verification_status, description, profile_photo, cover_photo, admin_id) 
            VALUES ('${data.username}','${data.reg_no}','${data.vat_no}','${data.pan_no}','${data.business_type}','${data.email}','${data.country_code}','${data.phone_number}','${data.package_id}',CURRENT_TIMESTAMP,'${data.package_expire_date}','${identitycode}','${data.location.country}','${data.location.city}','${data.location.street}','${data.verification_status}',${null},${null},${null},${adminId});
         `)
         let partnerId: string = employeeTableName.split('_')[0].substring(2);
         await client.query(`UPDATE partners SET identity_code = $1 WHERE id = $2`,[identitycode,partnerId])
         console.log("updated partners table");
      } catch (error) {
         console.error('Error inserting restaurant data or updating partners data:', error);
         throw new Error('Failed inserting restaurant data');
      }

      await client.query('COMMIT');
      await rClient.query('COMMIT');
      return true;
   } catch (error) {
      console.error('Error error saving client data', error);
      await client.query('ROLLBACK')
      await rClient.query('ROLLBACK')
      return false;
   }
}


// async function insertEmployee(employeeData:TypeRestaurantEmployee) {
//    const { username, password, email, role_code, country_code, phone_number, location } = employeeData;
//    let rClient = await ConnectToClientDatabase();
//    try {
//      const res = await rClient.query(`
//        INSERT INTO employees (username, password, email, role_code, country_code, phone_number, join_date, country, city, street) 
//        VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, $7, $8, $9) RETURNING id;`,
//       [username, password, email, role_code, country_code, phone_number, location.country, location.city, location.street]);
 
//      console.log('Inserted employee with ID:', res.rows[0].id);
//      return res.rows[0].id;
//    } catch (err) {
//      console.error('Error inserting employee:', err);
//    }
//  }

// async function createPartnerRestaurantsEmployeesTable(){
//    const client = await db.connect();//main_menu_app db(main company)
//    const rClient = await ConnectToClientDatabase();// menu_app db(restaurants)
//     //sql
//     try {
//        await client.query('BEGIN');
//        try {
//          //check if partner table exist of not in main_menu_app db
//          await client.query(`
//             CREATE TABLE IF NOT EXISTS partners (
//                id SERIAL PRIMARY KEY,
//                username VARCHAR(225) UNIQUE NOT NULL,
//                reg_no VARCHAR(225) UNIQUE NOT NULL,
//                vat_no VARCHAR(225),
//                pan_no VARCHAR(225),
//                business_type VARCHAR(225) NOT NULL,
//                email VARCHAR(225) UNIQUE NOT NULL,
//                country_code VARCHAR(5) NOT NULL,
//                phone_number VARCHAR(10) UNIQUE NOT NULL,
//                master_key VARCHAR(225) UNIQUE NOT NULL,
//                package_id VARCHAR(225) NOT NULL,
//                join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//                package_expire_date TIMESTAMP WITH TIME ZONE NOT NULL,
//                identity_code VARCHAR(225) UNIQUE NOT NULL,
//                country VARCHAR(225) NOT NULL,
//                city VARCHAR(225) NOT NULL,
//                street VARCHAR(225) NOT NULL,
//                verification_status VARCHAR(225) NOT NULL
//             );
//          `)
//       } catch (error) {
//          console.error('Error creating partners table: ', error);
//          await client.query('ROLLBACK');
//          throw new Error('Failed to create partners table');
//       }

//       await rClient.query('BEGIN');
      

     
//       await client.query('COMMIT')
//       await rClient.query('COMMIT')
//       return true;

//    } catch (error) {
//       console.error('error creating partners, restaurants and employees table: ', error);
//       try {
//          await client.query('ROLLBACK');
//       } catch (rollbackError) {
//          console.error('Error rolling back transaction for partners table: ', rollbackError);
//       }
//       try {
//          await rClient.query('ROLLBACK');
//       } catch (rollbackError) {
//          console.error('Error rolling back transaction for restaurants and employees tables: ', rollbackError);
//       }
//       return false;
//    }finally {
//       // Ensure both clients are properly closed
//       await client.release();
//       await rClient.release();
//    }
// }



