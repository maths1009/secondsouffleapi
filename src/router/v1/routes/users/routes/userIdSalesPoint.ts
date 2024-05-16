import { authenticateUser } from '@middlewares/auth'
import { Role } from '@type/auth'

import { Router } from 'express'

import { userController } from '../controller'

const router = Router()

router.get('/:id/salesPoint', authenticateUser(), userController.getUserSalesPointById)

export default router
