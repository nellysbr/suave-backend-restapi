// types/express.d.ts

import { JwtPayload } from "jsonwebtoken";
import { Request as ExpressRequest } from "express-serve-static-core";

declare module "express" {
  interface Request<
    P = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
  > extends ExpressRequest {
    user?: JwtPayload;
  }
}
