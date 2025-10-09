import { Router } from "express"
import { register, login } from './auth.controller.js'
import { uploadProfilePicture } from "../../middlewares/file-uploader.js";
import { loginValidator, registerValidator } from "../../middlewares/auth-validator.js";

const router = Router()

router.post('/register', 
    uploadProfilePicture.single('profilePicture'), 
    registerValidator,
    register
)

router.post('/register', register)

router.post('/login', loginValidator, login)

export default router   

 
 
 
                     


