import { authenticateUser } from '@middlewares/auth'

import { Router } from 'express'

import { userController } from '../controller'

const router = Router()

router.post('/', authenticateUser, userController.addUser)

export default router
