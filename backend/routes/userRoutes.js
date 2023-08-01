const express=require('express')
const { signUp, login, updateUser, changePassword, isAuthanticated, logout } = require('../controllers/userControllers')
const { fileUpload } = require('../middlewares/fileUpload')
const authantication = require('../middlewares/authantication')
const upload=fileUpload('./uploads/user',"photo");  
const router=express.Router()



// all routes
router.route('/signup').post(signUp)
router.route('/signin').post(login)
router.route('/logout').get(authantication,logout)
router.route('/changepassword').post(authantication,changePassword);
router.route('/update').post(upload,authantication,updateUser);
router.route('/isauth').post(authantication,isAuthanticated)

module.exports=router