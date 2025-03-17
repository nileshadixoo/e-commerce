import {Router} from "express"
import { addProductToCart, decrementCount, deleteProductFromCart, getCart, incrementCount } from "../controllers/cart.controller.js";

const router = Router();

router.route('/add').post(addProductToCart)
router.route('/increment-count').put(incrementCount)
router.route('/decrement-count').put(decrementCount)
router.route('/delete').delete(deleteProductFromCart)
router.route('/get').get(getCart)

export default router;