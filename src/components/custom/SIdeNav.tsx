import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";

import React from 'react'

type navItem = {
   title: string;
   href: string;
}
const SIdeNav = ({ items }: { items: navItem[] }) => {
   return (
      <Sheet>
         <SheetTrigger>Open</SheetTrigger>
         <SheetContent side={"left"}>
            <SheetHeader>
               {
                  items?.map((item, i) =>
                     <SheetTitle key={i}>
                        <Link href={item.href}>{item.title}</Link>
                     </SheetTitle>
                  )
               }

            </SheetHeader>
         </SheetContent>
      </Sheet>
   )
}

export default SIdeNav