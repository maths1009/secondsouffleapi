import { authenticateUser } from '@middlewares/auth'

import { Router } from 'express'

import { userController } from '../controller'

const router = Router()

//TODO add Authrization middleware
router.post('/', authenticateUser, userController.addUser)

export default router
