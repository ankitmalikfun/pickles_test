import { Request, Response, NextFunction } from "express";
import * as logger from '../libs/Logger';

import { APIError } from "../entities/errors";
import { SuccessResponse } from "../entities/responses";

export default function controllerAdapter(controller: any = null, functionName: string = "") {
  return async (req: Request, res: Response, next: NextFunction) => {
    const {
      headers: { authorization },
      params,
      query,
      body
    } = req;

    const { locals } = res;
    try {
      if (locals.isHit) {
        return next();
      }

      const result = await controller[functionName]({ headers: { authorization }, params, query, locals, body });
      res.locals.isHit = true;

      if (result.type === APIError.name) {
        // result is an APIError
        logger.debug(result);

        next(result);
      } else {
        const response = new SuccessResponse(result);
        res.locals.response = response;
        return res.json(response);
      }
    } catch (error) {
      logger.error("controllerAdapter - error:", JSON.stringify(error, null, 2));
      next(error);
    }
  };
}
