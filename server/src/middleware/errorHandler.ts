import { Request, NextFunction, Response } from "express";
import { ValidationError } from "joi";
import HttpError from "../errors/httpError";
import logger from "../utils/logger";

const IS_DEV_MODE: boolean = process.env.NODE_ENV === "development";

export default function errorHandler(err: HttpError | Error | ValidationError, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err);
  }

  logger.error(err);

  const hasValidationError = err instanceof ValidationError && err.isJoi;

  if (hasValidationError) {
    return res.status(400).json({
      status_code: 422,
      message: "Validation Error",
      error: err.details.map(details => details.message).join(", ")
    });
  }

  const status = IS_DEV_MODE && err instanceof HttpError ? err.statusCode : 500;
  const message = IS_DEV_MODE && err instanceof HttpError ? err.message : "Internal Server Error";

  return res.status(status).json({
    status_code: status,
    message,
    ...(err instanceof HttpError && IS_DEV_MODE && { error: err.isOperational ? err.stack : null })
  });
}
