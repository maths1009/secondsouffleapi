import { prisma } from '@/app'

import { products } from '@prisma/client'

import { Request, Response } from 'express'

export const productsController = {
  addProducts: async (req: Request, res: Response) => {
    const { products }: { products: products[] } = req.body
    try {
      await prisma.products.createMany({
        data: products.map(product => ({
          name: product.name,
          description: product.description,
          color: product.color,
          material: product.material,
          quantity: product.quantity,
        })),
      })
      res.json({ message: 'Products added successfully' })
    } catch (error) {
      res.status(500).json({
        message: 'Error while adding products',
      })
    }
  },
}
