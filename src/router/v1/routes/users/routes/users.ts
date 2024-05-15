import { authenticateUser } from '@middlewares/auth'
import { Role } from '@type/auth'

import { Router } from 'express'

import { userController } from '../controller'

const router = Router()

router.post('/', authenticateUser(Role.ADMIN), userController.addUser)

export default router
