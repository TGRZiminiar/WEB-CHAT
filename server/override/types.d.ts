import "express"
import { UserSignJWT } from '../interface/user.interface';

/* declare global {
    namespace Express {
      interface Request {
        user: UserSignJWT 
      }
    }
} */
  declare module "express" { 
    export interface Request {
      user?: UserSignJWT
    }
  }