
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers;
    if(header.authorization){
        // TODO: make it async
        const decoded = jwt.verify(header.authorization, process.env.PRIVATE_KEY);
        res.locals.user = decoded;
    }
    next();
  }
}
