import { generateToken } from '@utils/auth'

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { authenticateUser } from '.'

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
