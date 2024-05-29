import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"




const AddClientForm = () => {
   
   return (
      <>
         <h1 className="text-center font-bold" >AddClientForm Page</h1>
         <hr />
         <hr />
         <form className="p-2 flex-row">
            <Label htmlFor="email">Your email address :</Label>
            <Input type="email"/>

            <Label htmlFor="password">Your Password :</Label>
            <Input type="password"/>

            <Label htmlFor="password">Confirm Password :</Label>
            <Input type="password"/>

            
            <div className='flex items-center justify-center '>
               <Checkbox /><span className='mx-2 text-xs'>Accept terms and conditions</span>
            </div>
            
            <br />
            <button type="submit" className="px-2 py-0.5 border border-black rounded-xl bg-blue-600 text-white font-semibold" >register</button>
         </form>
      </>

   )
}

export default AddClientForm