import {Router} from 'express';
import { deleteProduct, getAllProducts, getSingleProduct, searchProduct, updateProducts, uploadProduct } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { userAuth, verifyRole } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/get-all').get(getAllProducts)
router.route('/search/:name').get(searchProduct)
router.route('/get/:id').get(userAuth,verifyRole,getSingleProduct)
router.route('/upload').post(userAuth,verifyRole, upload.single('product-img'),uploadProduct)
router.route('/:id').put(userAuth,verifyRole,upload.single('product-img'),updateProducts)
router.route('/:id').delete(userAuth,verifyRole,deleteProduct)

export default router