import { hashPassword } from '@utils/auth'

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
}
