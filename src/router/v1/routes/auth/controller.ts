import { comparePassword, generateToken } from '@utils/auth'

import { prisma } from '@/app'

import { Role } from '@type/auth'

import { Request, Response } from 'express'

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await prisma.users.findFirst({ where: { email: email } })
    const passwordMatch = await comparePassword(password, user?.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'incorrect email or password' })
    }
    const userRole = await prisma.roles.findFirst({
      where: { id: user!.id_roles },
    })
    const role = Role[userRole!.name as keyof typeof Role]
    if (!role) return res.status(401).json({ message: 'invalid role' })
    const token = generateToken(user!.id.toString(), role)
    res.json({ message: token })
  },
  logout: async (req: Request, res: Response) => {
    res.json({ message: 'logout success' })
  },
}
