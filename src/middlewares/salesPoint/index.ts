import { checkToken } from '@utils/auth'

import { prisma } from '@/app'

import { NextFunction, Request, RequestHandler, Response } from 'express'

/**
 * Middleware function to check access to a sales point.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 * @returns void
 */
export const checkSalesPointAccess: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { decodedToken } = checkToken(req.headers.authorization!)
  const salesPoint = await prisma.j_sales_users.findFirst({
    where: {
      id_sales_point: parseInt(id),
      id_users: parseInt(decodedToken?.userId!),
    },
  })
  if (!salesPoint) {
    return res.status(401).json({
      message: 'Unauthorized access - invalid sales point',
    })
  }
  next()
}
