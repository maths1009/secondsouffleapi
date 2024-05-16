import { authenticateUser } from '@middlewares/auth'
import { checkUserId } from '@middlewares/users'

import { Router } from 'express'

import { userController } from '../controller'

const router = Router()

router.get(
  '/:id/sales-point',
  [authenticateUser(), checkUserId],
  userController.getUserSalesPointById
)

export default router
