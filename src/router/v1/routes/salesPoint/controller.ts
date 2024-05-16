import { prisma } from '@/app'

import { products } from '@prisma/client'

import { Request, Response } from 'express'

export const salesPointController = {
  getProductsBySalesPointId: async (req: Request, res: Response) => {
    const { id } = req.params
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
  addProductsToSalesPoint: async (req: Request, res: Response) => {
    const { id } = req.params
    const { products }: { products: Pick<products, 'id'>[] } = req.body
    try {
      const productsIds = products.map(p => p.id)
      const existingProducts = await prisma.products.findMany({
        where: {
          id: {
            in: productsIds,
          },
        },
      })
      const existingProductIds = existingProducts.map(p => p.id)
      const nonExistingProductIds = productsIds.filter(
        id => !existingProductIds.includes(id)
      )
      if (nonExistingProductIds.length > 0) {
        return res.status(400).json({
          error: `The following product IDs do not exist: ${nonExistingProductIds.join(', ')}`,
        })
      }
      await prisma.j_sales_products.createMany({
        data: products.map(p => ({
          id_sales_point: parseInt(id),
          id_products: p.id,
        })),
      })
      res.json({
        message: 'Successfully added products to sales point',
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error when adding products to sales point' })
    }
  },
}
