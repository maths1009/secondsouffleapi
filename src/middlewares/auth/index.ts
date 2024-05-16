import { checkToken } from '@utils/auth'

import { Role } from '@type/auth'

import { NextFunction, Request, RequestHandler, Response } from 'express'

/**
 * Middleware function to authenticate user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 * @returns If the user is authenticated, calls the next function. Otherwise, returns a 401 Unauthorized response.
 */
export const authenticateUser = (role?: Role): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Unauthorized - Missing token or incorrect format',
      })
    }
    const { decodedToken, isValid } = checkToken(authorizationHeader)
    if (!isValid || (role && decodedToken.userRole !== role)) {
      return res
        .status(401)
        .json({ message: 'Unauthorized access - invalid role' })
    }
    next()
  }
}
