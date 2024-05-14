import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

/**
 * Middleware function to authenticate user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 * @returns If the user is authenticated, calls the next function. Otherwise, returns a 401 Unauthorized response.
 */
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Unauthorized access - Missing token or incorrect format',
    })
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized access - Invalid token' })
  }
}
