import React from 'react'
import Link from 'next/link';

const PartnerCompanyDepartment = () => {
   return (
      <div><p>PCD login page </p>
         <Link href={'/pcd/manager'} className="text-blue-600 hover:text-blue-800">
            login universal
            
         </Link>
      </div>

   )
}

export default PartnerCompanyDepartment