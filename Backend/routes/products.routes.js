import {Router} from 'express';
import { deleteProduct, getAllProducts, getSingleProduct, searchProduct, updateProducts, uploadProduct } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
router.route('/get-all').get(getAllProducts)
router.route('/get/:id').get(getSingleProduct)
router.route('/upload').post(upload.single('product-img'),uploadProduct)
router.route('/:id').put(upload.single('product-img'),updateProducts)
router.route('/:id').delete(deleteProduct)
router.route('/search/:name').get(searchProduct)

export default router