import { checkToken } from '@utils/auth'

import { prisma } from '@/app'

import { Request, Response } from 'express'

export const salesPointController = {
  getProductsBySalesPointId: async (req: Request, res: Response) => {
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
    const products = await prisma.j_sales_products.findMany({
      where: {
        id_sales_point: parseInt(id),
      },
    })
    const productsId = products.map(p => p.id_products)
    const productsData = await prisma.products.findMany({
      where: {
        id: {
          in: productsId,
        },
      },
    })
    res.json({ message: productsData })
  },
}
