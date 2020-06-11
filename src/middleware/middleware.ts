import { Request, Response } from "express";

/**
 * Sends a response back to the client
 * @param res response - handled by express automatically
 * @param result Result (content) that should be send to the client
 * @param status Status (in json) that should be send to the client
 */
export function sendResult(res: Response, result: any, status: number) {
  res.json({
    time: +new Date(),
    status: status,
    result,
  });
}
