import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as argon2 from "argon2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//generate unique string
let usedStrings = new Set();
export function generateUniqueString():string {
  let result;
  do {
    // Generate a random 8-character string consisting of lowercase letters, uppercase letters, digits, and symbols
    result = `${Math.random().toString(36).substring(2, 10)}` +
              `${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}` + // Uppercase letter
              `${String.fromCharCode(Math.floor(Math.random() * 26) + 97)}` + // Lowercase letter
              `${Math.random().toString(10).substring(2, 3)}` + // Digit
              `${['!', '@', '#', '$', '%', '^', '&', '*'][Math.floor(Math.random() * 8)]}`; // Special character
  } while (usedStrings.has(result));

  // Add the generated string to the set to ensure uniqueness
  usedStrings.add(result);

  return result;
}

// password hashing and comparing
// export async function hashPassword(unHashPass: string){
//   return await argon2.hash(unHashPass,{type:argon2.argon2i});
// }

// export async function isSamePassword(unHashPass: string, hashPass:string){
//   return await argon2.verify(hashPass,unHashPass);
// }

//generate crediential for client admin
// export async function generateClientLoginId(username: string, password: string){
//   let unhashPwd: string = generateUniqueString();
//   let hashPwd: string = await hashPassword(unhashPwd);

//   const LoginId:{userName:string, password: string} = {
//     userName: username,
//     password: ''
//   }
//   LoginId.password = hashPwd;

//   return LoginId;
// }