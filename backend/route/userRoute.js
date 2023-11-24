import express from "express";
const router =  express.Router();

import { authUser,
    registerUser,
    updateUserProfile,
    getUserProfile,
    logoutUser,setcook,getNearUser
 } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleWare.js";

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);


router.route('/getusers/:id').get(getNearUser);
router.route('/profile').put(protect,updateUserProfile)
 
export default router;