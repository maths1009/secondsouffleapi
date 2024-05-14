import { Router } from 'express'

import UsersRoute from './routes/users'

const router = Router()

router.use('/users', UsersRoute)

export default router
