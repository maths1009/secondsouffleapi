import { authenticateUser } from '@middlewares/auth'
import { checkSalesPointAccess } from '@middlewares/salesPoint'

import { Router } from 'express'

import { salesPointController } from '../controller'

const router = Router()

router.get(
  '/:id/products',
  [authenticateUser(), checkSalesPointAccess],
  salesPointController.getProductsBySalesPointId
)

router.post(
  '/:id/products',
  [authenticateUser(), checkSalesPointAccess],
  salesPointController.addProductsToSalesPoint
)

export default router
