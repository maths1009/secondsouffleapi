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
        id_role: idRole,
        id_sales_point: idSalesPoint,
        name,
        profilePicture,
        createdAt: new Date().getTime().toString(),
      },
    })
    res.json(user)
  },
}
