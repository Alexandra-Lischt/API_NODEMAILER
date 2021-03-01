import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import createConnection from "./database";
import { AppError } from "./errors/AppError";

createConnection();

const app = express();
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).send({
      message: err.message
    })
  }
  return response.status(500).send({
    status: "Error",
    message: `Internal server error ${err.message}`
  })
})
export { app };

