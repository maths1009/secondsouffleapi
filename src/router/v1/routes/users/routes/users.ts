import { authenticateUser } from '@middlewares/auth'
import { checkUserId } from '@middlewares/users'
import { Role } from '@type/auth'

import { Router } from 'express'

import { userController } from '../controller'

const router = Router()

router.post('/', authenticateUser(Role.ADMIN), userController.addUser)
router.patch(
  '/:id',
  [authenticateUser(), checkUserId],
  userController.updateUser
)

export default router
