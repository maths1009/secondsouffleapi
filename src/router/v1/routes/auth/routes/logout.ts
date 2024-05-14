import { authenticateUser } from '@/utils/Auth'

import { Router } from 'express'

import { authController } from '../controller'

const router = Router()

router.post('/', authenticateUser, authController.logout)

export default router
