import { RegisterClient } from "@/lib/data/client";
import { NextResponse, NextRequest } from "next/server";
import { ClientDemoData } from "@/placeholderData";

export async function POST(request: NextRequest, response: NextResponse){
   try {
      let result = await RegisterClient(ClientDemoData)
      console.log("result", result)
      return new NextResponse(JSON.stringify({ message: 'Connection successful', result }), {
         status: 200,
         headers: {
           'Content-Type': 'application/json',
         },
       });
   } catch (error) {
      console.log(error)
      return new NextResponse(JSON.stringify({ message: 'Connection Unsuccessful' }), {
         headers: {
           'Content-Type': 'application/json',
         },
       });
   }
}

export async function GET(){
   
}