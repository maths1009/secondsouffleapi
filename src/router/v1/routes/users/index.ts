import { Router } from 'express'

import UserIdSalesPointRoute from './routes/userIdSalesPoint'
import UsersRoute from './routes/users'

const router = Router()

router.use(UsersRoute)
router.use(UserIdSalesPointRoute)

export default router
