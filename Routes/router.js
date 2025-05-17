const express=require('express')
const router=express.Router()
const userReg=require('../Controllers/userController')
const userLog=require('../Controllers/userController')
const productController = require('../Controllers/productController'); 
const categoryController=require('../Controllers/categoryController')
const subCategoryController=require('../Controllers/subCategoryController')
const jwtMiddle=require('../MiddleWares/jwtMiddleware')
const multerConfig=require('../MiddleWares/multerMiddleware')

router.post('/register',userReg.userRegistration)
router.post('/log',userLog.userLogin)
router.post('/addproduct',jwtMiddle,multerConfig.single('imageUrl'),productController.addProducts)
router.post('/addcategory',jwtMiddle,categoryController.addCategory)
router.post('/addsubcategory',jwtMiddle,subCategoryController.addsubCategory)


router.get('/allproduct',jwtMiddle,productController.getAllProducts)
router.get('/allcategory',categoryController.getallCategory)
router.get('/allsubcategory',jwtMiddle,subCategoryController.getAllSubcat)








module.exports=router