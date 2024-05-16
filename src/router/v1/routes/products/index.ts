import { Router } from 'express'

import productsRoutes from './routes/products'

const router = Router()

router.use(productsRoutes)

export default router
