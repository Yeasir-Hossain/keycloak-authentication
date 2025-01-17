import { Request, NextFunction, Response } from "express";
import { ValidationError } from "joi";
import HttpError from "../errors/httpError";

const IS_DEV_MODE: boolean = process.env.NODE_ENV === "development";

export default function errorHandler(
  err: HttpError | Error | ValidationError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ValidationError && err.isJoi) {
    return res.status(422).json({
      status_code: 422,
      message: "Validation Error",
      error: err.details.map(detail => detail.message).join(", ")
    });
  }

  if (err instanceof HttpError && err.isOperational) {
    return res.status(err.statusCode).json({
      status_code: err.statusCode,
      message: err.message,
      ...(IS_DEV_MODE && { stack: err.stack })
    });
  }

  const defaultError = {
    status_code: 500,
    message: "Internal Server Error"
  };

  const devError = IS_DEV_MODE ? {
    actualMessage: err.message,
    stack: err.stack
  } : {};

  return res.status(500).json({
    ...defaultError,
    ...devError
  });
}