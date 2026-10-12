import authMiddleware from "./middlewares/authMiddleware";
import intlMiddleware from "./middlewares/intlMiddleware";
import { chain } from "@nimpl/middleware-chain";
import { Middleware } from "@nimpl/middleware-chain/dist/lib/types";

export default chain([
  intlMiddleware,
  authMiddleware as Middleware,
]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icon.ico).*)'],
};
