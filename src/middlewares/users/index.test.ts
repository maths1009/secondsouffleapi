import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { checkUserId } from '.'

describe('checkUserId', () => {
  const mockRequest = (id: string, token: string) =>
    ({
      params: { id },
      headers: { authorization: token },
    }) as unknown as Request

  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  const mockNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call the next middleware if the user ID matches the decoded token', () => {
    const userId = '123456'
    const token = 'valid_token'
    const req = mockRequest(userId, token)
    const res = mockResponse()

    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      return { userId }
    })
    checkUserId(req, res, mockNext)

    expect(mockNext).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  it('should return a 401 Unauthorized response if the user ID does not match the decoded token', () => {
    const token = 'valid_token'
    const req = mockRequest('789012', token)
    const res = mockResponse()

    checkUserId(req, res, mockNext)

    expect(mockNext).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
  })
})
