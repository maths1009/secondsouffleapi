import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import {
  authenticateUser,
  comparePassword,
  generateToken,
  hashPassword,
} from './index'

describe('Auth Utils', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = '123456'
      const token = generateToken(userId)
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
      expect(decoded.userId).toBe(userId)
    })
  })

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const password = 'password123'
      const hashedPassword = await hashPassword(password)
      expect(hashedPassword).not.toBe(password)
    })
  })

  describe('comparePassword', () => {
    it('should return true if the password matches the hashed password', async () => {
      const password = 'password123'
      const hashedPassword = await bcrypt.hash(password, 10)
      const result = await comparePassword(password, hashedPassword)
      expect(result).toBe(true)
    })

    it('should return false if the password does not match the hashed password', async () => {
      const password = 'password123'
      const hashedPassword = await bcrypt.hash('wrongpassword', 10)
      const result = await comparePassword(password, hashedPassword)
      expect(result).toBe(false)
    })

    it('should return false if the hashed password is not provided', async () => {
      const password = 'password123'
      const result = await comparePassword(password)
      expect(result).toBe(false)
    })
  })

  describe('authenticateUser', () => {
    it('should call the next function if the token is valid', () => {
      const validToken = generateToken('123456')
      const req = {
        headers: {
          authorization: `Bearer ${validToken}`,
        },
      }
      const res = {}
      const next = jest.fn()
      authenticateUser(req as Request, res as Response, next as NextFunction)
      expect(next).toHaveBeenCalled()
    })

    it('should return 401 if the token is missing or has incorrect format', () => {
      const req = {
        headers: {
          authorization: 'invalidToken',
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()
      authenticateUser(
        req as Request,
        res as unknown as Response,
        next as NextFunction
      )
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Unauthorized access - Missing token or incorrect format',
      })
      expect(next).not.toHaveBeenCalled()
    })

    it('should return 401 if the token is invalid', () => {
      const req = {
        headers: {
          authorization: 'Bearer invalidToken',
        },
      }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }
      const next = jest.fn()
      jwt.verify = jest.fn(() => {
        throw new Error('Invalid token')
      })
      authenticateUser(
        req as Request,
        res as unknown as Response,
        next as NextFunction
      )
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Unauthorized access - Invalid token',
      })
      expect(next).not.toHaveBeenCalled()
    })
  })
})
