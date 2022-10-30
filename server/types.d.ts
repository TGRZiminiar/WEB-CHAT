import "express"
import {UserMiddleware} from "./Interface/user.interface"

declare global {
    namespace Express {
      interface Request {
        user?: UserMiddleware 
      }
    }
  }