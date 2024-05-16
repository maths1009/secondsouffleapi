import { authenticateUser } from '@middlewares/auth'

import { Router } from 'express'

import { productsController } from '../controller'

const router = Router()

router.post('/', authenticateUser(), productsController.addProducts)

export default router
