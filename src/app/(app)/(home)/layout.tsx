
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from '@/payload-types';

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilter } from "./search-filters";


interface Props {
    children: React.ReactNode;
}

const Layout = async ({children}:Props) => {
        const payload = await getPayload({
          config: configPromise,
        })
      
        const data = await payload.find({
          collection: 'categories',
          depth:1,      //populate subcategories. subcategories[0] will be a type of "Category"
          pagination:false,          
          where: {
            parent : {
              exists:false,
            },
          },
        });

        const formattedData = data.docs.map((doc)=>({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc)=>({
            // Because of depth:1 we know that "doc" of "Category".
            ...(doc as Category),
            subcategories: undefined,
          })) 
        }));
        console.log({
          data, 
          formattedData,  
        });
  return (
    <div className="flex flex-col min-h-screen">
       <Navbar/>
       <SearchFilter data={formattedData}/>
       <div className="flex-1 bg-[#F4F4F0]">
        {children}
       </div> 
      
        <Footer/>
      
      
    </div>
  )
}

export default Layout

