import { checkToken, hashPassword } from '@utils/auth'

import { prisma } from '@/app'

import { Request, Response } from 'express'

export const userController = {
  addUser: async (req: Request, res: Response) => {
    const { email, password, idRole, idSalesPoint, name, profilePicture } =
      req.body
    const user = await prisma.users.create({
      data: {
        email,
        password: await hashPassword(password),
        id_roles: idRole,
        name,
        profilePicture,
        createdAt: new Date().getTime().toString(),
      },
    })

    await prisma.j_sales_users.create({
      data: {
        id_users: user.id,
        id_sales_point: idSalesPoint,
      },
    })

    res.json(user)
  },
  getUserSalesPointById: async (req: Request, res: Response) => {
    const token = req.headers.authorization
    const { id } = req.params
    const { decodedToken } = checkToken(token!) // Is valid token because, the middleware already check the token
    if (decodedToken?.userId !== id) {
      return res.status(401).json({ message: 'unauthorized' })
    }
    const user = await prisma.users.findFirst({
      where: { id: parseInt(id) },
      include: {
        j_sales_users: {
          select: {
            id_sales_point: true,
          },
        },
      },
    })
    const idsSalesPoint = user?.j_sales_users.map(j => j.id_sales_point)
    const salesPoint = await prisma.salespoint.findMany({
      where: {
        id: {
          in: idsSalesPoint,
        },
      },
    })

    res.json(salesPoint)
  },
}
