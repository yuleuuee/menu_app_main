import { db } from '@vercel/postgres';
import { ConnectToClientDatabase } from '../db/clientdb';
import { TypeClient } from '@/types/client';
import {generateUniqueString } from '../utils';
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

export const RegisterClient = async (data:TypeClient)=>{
   console.log("data",data)

   
   try {
      // if(!client && !rClient){ 
      //    throw new Error("SomeThing Went Wrong!");
      // }
      
      let admin:{username:string, password: string} = {
         username: data.username,
         password: generateUniqueString()
      };
      let adminHashPwd = await argon2.hash(admin.password,{type:argon2.argon2i});
         //check and create restaurants and employee table in menu_app db
      let TableCreated = await createPartnerRestaurantsEmployeesTable();
      // let RestaurantsAndEmployeeTableCreated = await createRestaurantsAndEmployeesTable();
      
      if(TableCreated){
         console.log("partners, restaurants, employees table created")
      }else{
         throw new Error("error creating partners or restaurants or employees table");
      }
      return "success"
   } catch (error) {
      console.log(error)
      return "unsuccess"
   }
} 

async function createPartnerRestaurantsEmployeesTable(){
   const client = await db.connect();//main_menu_app db(main company)
   const rClient = await ConnectToClientDatabase();// menu_app db(restaurants)
    //sql
    try {
       await client.query('BEGIN');
       try {
         //check if partner table exist of not in main_menu_app db
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

      await rClient.query('BEGIN');
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
               verification_status VARCHAR(225) NOT NULL
            );
         `)
      } catch (error) {
         console.error('Error creating restaurants table: ', error);
         await rClient.query('ROLLBACK');
         throw new Error('Failed to create restaurants table');
      }

      try {
         await rClient.query(`
            CREATE TABLE IF NOT EXISTS employees (
               id SERIAL PRIMARY KEY,
               username VARCHAR(225) UNIQUE NOT NULL,
               password VARCHAR(225) UNIQUE NOT NULL,
               email VARCHAR(225) UNIQUE NOT NULL,
               country_code VARCHAR(5) NOT NULL,
               phone_number VARCHAR(10) UNIQUE NOT NULL,
               join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
               country VARCHAR(225) NOT NULL,
               city VARCHAR(225) NOT NULL,
               street VARCHAR(225) NOT NULL
            );
         `)
      }catch (error) {
         console.error('Error creating employees table: ', error);
         await rClient.query('ROLLBACK');
         throw new Error('Failed to create employees table');
      }
      await client.query('COMMIT')
      await rClient.query('COMMIT')
      return true;

   } catch (error) {
      console.error('error creating partners, restaurants and employees table: ', error);
      try {
         await client.query('ROLLBACK');
      } catch (rollbackError) {
         console.error('Error rolling back transaction for partners table: ', rollbackError);
      }
      try {
         await rClient.query('ROLLBACK');
      } catch (rollbackError) {
         console.error('Error rolling back transaction for restaurants and employees tables: ', rollbackError);
      }
      return false;
   }finally {
      // Ensure both clients are properly closed
      await client.release();
      await rClient.release();
   }
}



