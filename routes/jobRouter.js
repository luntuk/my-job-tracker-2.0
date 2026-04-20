import { Router } from 'express';
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import {
  validateJobInput,
  validateJobUpdateInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput, createJob);

router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(validateJobUpdateInput, validateIdParam, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
