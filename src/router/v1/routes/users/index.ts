import { Router } from 'express'

import UserIdSalesPointRoute from './routes/userIdSalesPoint'
import UsersRoute from './routes/users'

const router = Router()

router.use('/users', UsersRoute)
router.use('/users', UserIdSalesPointRoute)

export default router
