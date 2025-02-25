import {Router} from 'express';
import { updateProducts, uploadProduct } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
router.route('/upload').post(upload.single('product-img'),uploadProduct)
router.route('/:id').put(upload.single('product-img'),updateProducts)

export default router