import { Router } from 'express'

import loginRoute from './routes/login'
import logoutRoute from './routes/logout'

const router = Router()

router.use('/login', loginRoute)
router.use('/logout', logoutRoute)

export default router
