const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const studentController = require("../controllers/studentController");
const {auth} = require ("../middleware/auth")



router.post("/api/register", userController.register);
router.post("/api/login", userController.loginUser);
router.post("/api/user/logout", userController.logout);

//===========> Student <==============

router.post("/api/user/addstudent", auth, studentController.createStudent)
router.get("/api/user/getstudent",auth, studentController.getStudent)
router.put("/api/user/updatestudenet",auth, studentController.updateStudent)
router.delete("/api/user/deletestudent", auth, studentController.deleteStudent)

module.exports = router;
