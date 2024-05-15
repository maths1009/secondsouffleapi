import { generateToken } from '@utils/auth'

import { Role } from '@type/auth'

import { NextFunction, Request, Response } from 'express'

import { authenticateUser } from './index'

describe('authenticateUser', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
    next = jest.fn() as NextFunction
  })

  it('should call next function if user is authenticated and have a good role', () => {
    const validToken = generateToken('1', Role.ADMIN)
    req.headers = {
      authorization: `Bearer ${validToken}`,
    }
    const middleware = authenticateUser(Role.ADMIN)
    middleware(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('should not call next function if user have not a good role', () => {
    const validToken = generateToken('1', Role.PARTNER)
    req.headers = {
      authorization: `Bearer ${validToken}`,
    }
    const middleware = authenticateUser(Role.ADMIN)
    middleware(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
  })

  it('should not call next function if user not a good token', () => {
    req.headers = {
      authorization: `Bearer not-a-good-token`,
    }
    const middleware = authenticateUser(Role.ADMIN)
    middleware(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
  })

  it('should not call next function if user not a good token', () => {
    req.headers = {
      authorization: `not-a-good-token`,
    }
    const middleware = authenticateUser(Role.ADMIN)
    middleware(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
  })
})
