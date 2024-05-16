import { authenticateUser } from '@middlewares/auth'

import { Router } from 'express'

import { salesPointController } from '../controller'

const router = Router()

router.post(
  '/:id/products',
  authenticateUser(),
  salesPointController.getProductsBySalesPointId
)

export default router
