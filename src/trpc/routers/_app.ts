
import { authRouter } from '@/modules/auth/server/procedures';
import {  createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedure';
import { productRouter } from '@/modules/products/server/procedures';
import { tagsRouter } from '@/modules/tags/server/procedures';
export const appRouter = createTRPCRouter({
    auth: authRouter,
    tags:tagsRouter,
    products:productRouter,
    categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;