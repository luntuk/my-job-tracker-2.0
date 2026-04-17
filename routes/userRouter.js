import { Router } from 'express';
import { updateUser } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;
