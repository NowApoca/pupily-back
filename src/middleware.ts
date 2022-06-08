
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    if(headers.authorization){
        const decoded = jwt.verify(headers.authorization, process.env.PRIVATE_KEY);
        res.locals.user = decoded;
    }
    next();
  }
}
