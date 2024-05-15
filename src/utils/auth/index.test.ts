import { Role } from '@type/auth'

import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'

import {
  checkToken,
  comparePassword,
  generateToken,
  hashPassword,
} from './index'

describe('Auth Utils', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = '123456'
      const token = generateToken(userId, Role.ADMIN)
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
      expect(decoded.userId).toBe(userId)
      expect(decoded.userRole).toBe(Role.ADMIN)
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
  describe('checkToken', () => {
    it('should return a valid decoded token if the token is valid', () => {
      const token = 'valid_token'
      const decodedToken = { userId: '123456', userRole: Role.ADMIN }
      jest.spyOn(jwt, 'verify').mockReturnValue(decodedToken as any)
      const result = checkToken(token)
      expect(result.isValid).toBe(true)
      expect(result.decodedToken).toEqual(decodedToken)
    })

    it('should return an invalid decoded token if the token is invalid', () => {
      const token = 'invalid_token'
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid token')
      })
      const result = checkToken(token)
      expect(result.isValid).toBe(false)
      expect(result.decodedToken).toBeUndefined()
    })
  })
})
