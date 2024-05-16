import { Router } from 'express'

import authRoutes from './routes/auth'
import salesPointRoutes from './routes/salesPoint'
import usersRoutes from './routes/users'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/sales-point', salesPointRoutes)

export default router
