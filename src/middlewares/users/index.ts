import { checkToken } from '@utils/auth'

import { NextFunction, Request, RequestHandler, Response } from 'express'

/**
 * Middleware to check if the user ID in the request parameters matches the user ID in the decoded token.
 * If the IDs do not match, it returns a 401 Unauthorized response.
 * Otherwise, it calls the next middleware in the chain.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export const checkUserId: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { decodedToken } = checkToken(req.headers.authorization!) // Is valid token because, the middleware already check the token
  if (id !== decodedToken?.userId) {
    return res.status(401).json({
      message: 'Unauthorized access - invalid user ID',
    })
  }
  next()
}
