import { checkToken } from '@utils/auth'

import { NextFunction, Request, RequestHandler, Response } from 'express'

export const checkUserId: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { decodedToken } = checkToken(req.headers.authorization!) // Is valid token because, the middleware already check the token
  if (id !== decodedToken?.userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}
