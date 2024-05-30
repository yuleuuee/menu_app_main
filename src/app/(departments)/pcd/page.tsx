import React from 'react'
import Link from 'next/link';

const PartnerCompanyDepartment = () => {
   return (
      <div><p>login page for manager and others</p>
         <Link href={'/pcd/manager'} className="text-blue-600 hover:text-blue-800">
            login
         </Link>
      </div>

   )
}

export default PartnerCompanyDepartment