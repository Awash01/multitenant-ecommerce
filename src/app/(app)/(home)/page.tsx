import configPromise from '@payload-config'
import { getPayload } from 'payload'




/**
 * Renders a page that fetches the `categories` collection from Payload and displays it as formatted JSON.
 *
 * @returns A React element that contains the JSON representation of the retrieved `categories` data.
 */
export default async function Home() {
      const payload = await getPayload({
        config: configPromise,
      })
    
      const data = await payload.find({
        collection: 'categories',
      })
 return(
  <div>
    {JSON.stringify(data, null, 2)}
  </div>
  
  
 )
}