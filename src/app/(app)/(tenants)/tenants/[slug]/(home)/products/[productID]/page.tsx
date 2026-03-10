import { ProductView, ProductViewSkeleton } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
    params: Promise<{productID: string; slug:string}>;
};


const page = async ({ params }:Props) => {
  const {productID, slug} = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
    slug,
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p> <ProductViewSkeleton/> </p>}>
          <ProductView productID={productID} tenantSlug={slug}/>
        </Suspense>
    </HydrationBoundary>
  )
}

export default page
