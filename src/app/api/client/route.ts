import { RegisterClient, TypeAdmin } from "@/lib/data/client";
import { NextResponse, NextRequest } from "next/server";
import { ClientDemoData } from "@/placeholderData";
import { TypePartner } from "@/types/client";
import { NextApiRequest, NextApiResponse } from "next";

async function streamToJson(stream: ReadableStream<Uint8Array>): Promise<TypePartner> {
  return await new Response(stream).json();
}

export async function POST(req: NextApiRequest, res: NextApiResponse){
  let reqObj = await streamToJson(req.body)
  console.log("reqObj", reqObj)
  // console.log(JSON.parse(req.body))
   try {
      let result:{success: boolean, payload:{admin: TypeAdmin}|string } = await RegisterClient(reqObj)
      
      console.log("result", result)
      if(!result.success){
        throw new Error(`${result.payload}`);
      }

     // Use NextApiResponse to send the response
      return NextResponse.json(
        {
          success: result.success,
          payload: result.payload // Assuming you want to send the result back
        },
        {status: 200}
      );

   } catch (error:any) {
      console.error("error at client register:",error)
      // Use NextApiResponse to send the response
      return NextResponse.json(
        {
          success: false,
          payload: "error registering client" // Assuming you want to send the result back
        },
        {status: 500}
      );
   }
}

export async function GET(){
   
}