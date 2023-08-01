const { createTodo, updateTodo, fetchTodos } = require("../controllers/todoControllers")
const authantication = require('../middlewares/authantication')
const router=require('express').Router();


// all routes
router.route('/create').post(authantication,createTodo)

router.route('/update').post(authantication,updateTodo)

router.route('/fetch').get(authantication,fetchTodos)

module.exports=router