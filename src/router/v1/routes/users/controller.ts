import { hashPassword } from '@utils/auth'

import { prisma } from '@/app'

import { Request, Response } from 'express'

export const userController = {
  addUser: async (req: Request, res: Response) => {
    const { email, password, idRole, idSalesPoint, name } = req.body

    // Check if email already exists
    const existingUser = await prisma.users.findFirst({ where: { email } })
    if (existingUser)
      return res.status(400).json({ message: 'Email already exists' })

    // Check if role exists
    const existingRole = await prisma.roles.findFirst({ where: { id: idRole } })
    if (!existingRole)
      return res.status(400).json({ message: 'Role does not exist' })

    // Check if sales point exists
    const existingSalesPoint = await prisma.salespoint.findFirst({
      where: { id: idSalesPoint },
    })
    if (!existingSalesPoint)
      return res.status(400).json({ message: 'Sales point does not exist' })

    const user = await prisma.users.create({
      data: {
        email,
        password: await hashPassword(password),
        id_roles: idRole,
        name,
        createdAt: new Date().toISOString(),
      },
    })

    await prisma.j_sales_users.create({
      data: {
        id_users: user.id,
        id_sales_point: idSalesPoint,
      },
    })

    res.json({ message: user })
  },
  getUserSalesPointById: async (req: Request, res: Response) => {
    const { id } = req.params
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

    res.json({ message: salesPoint })
  },
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params
    const { email, password, name, profilePicture } = req.body
    const user = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        email,
        password: await hashPassword(password),
        name,
        profilePicture,
      },
    })

    res.json({ message: user })
  },
}
