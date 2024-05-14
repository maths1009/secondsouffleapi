import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_DURATION!,
  })
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePassword = async (
  password: string,
  hashedPassword?: string
) => {
  if (!hashedPassword) return false
  return bcrypt.compare(password, hashedPassword)
}

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
