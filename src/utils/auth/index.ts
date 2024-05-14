import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

/**
 * Generates a JWT token for the given user ID.
 * @param userId - The ID of the user.
 * @returns The generated JWT token.
 */
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_DURATION!,
  })
}

/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = async (
  password: string,
  hashedPassword?: string
) => {
  if (!hashedPassword) return false
  return bcrypt.compare(password, hashedPassword)
}
