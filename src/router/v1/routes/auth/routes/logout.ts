import { authenticateUser } from '@middlewares/auth'

import { Router } from 'express'

import { authController } from '../controller'

const router = Router()

router.post('/', authenticateUser(), authController.logout)

export default router
