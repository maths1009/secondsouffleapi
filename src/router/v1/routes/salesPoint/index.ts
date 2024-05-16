import { Router } from 'express'

import SalesPointIdProductsRoute from './routes/salesPointIdProducts'

const router = Router()

router.use(SalesPointIdProductsRoute)

export default router
