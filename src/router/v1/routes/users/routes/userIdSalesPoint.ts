import { authenticateUser } from '@middlewares/auth'

import { Router } from 'express'

import { userController } from '../controller'

const router = Router()

router.get(
  '/:id/sales-point',
  authenticateUser(),
  userController.getUserSalesPointById
)

export default router
