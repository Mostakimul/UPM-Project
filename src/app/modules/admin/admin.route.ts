import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { AdminControllers } from './admin.controller'
import { updateAdminValidationSchema } from './admin.validation'

const router = express.Router()

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AdminControllers.getSingleAdmin,
)

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
)

router.delete('/:adminId', auth(USER_ROLE.admin), AdminControllers.deleteAdmin)
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AdminControllers.getAllAdmins,
)

export const AdminRoutes = router
