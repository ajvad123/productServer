const express=require('express')
const router=express.Router()
const userReg=require('../Controllers/userController')
const userLog=require('../Controllers/userController')
const productController = require('../Controllers/productController'); 
const jwtMiddle=require('../MiddleWares/jwtMiddleware')
const multerConfig=require('../MiddleWares/multerMiddleware')

router.post('/register',userReg.userRegistration)
router.post('/log',userLog.userLogin)
router.post('/add',jwtMiddle,multerConfig.single('imageUrl'),productController.addProducts)

router.get('/all',jwtMiddle,productController.getAllProducts)




module.exports=router