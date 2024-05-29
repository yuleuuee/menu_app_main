import SIdeNav from '@/components/custom/SIdeNav';
import React from 'react'

const PCManagerLayout = ({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) => {

   const departments = [
      { title: 'presentation', href: '/pcd/manager' },
      { title: 'add client', href: '/pcd/manager/add-client' },
   ];
   return (
      <div>
         <SIdeNav items={departments} />
         {children}
      </div>

   )
}

export default PCManagerLayout