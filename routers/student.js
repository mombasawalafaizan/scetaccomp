const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJwt');
const student_accomplishment = require('../controllers/studentExcellence');
const crud = require('../controllers/crud');

router.use(authJwt.verifyToken);
// router.use(authJwt.isStudent);
router.use(authJwt.isFaculty);

router
	.route('/achievement')
	.get(student_accomplishment.getCurrentStudentAccomplishment)
	.post(crud.createDataWrapper('student_accomp'))
	.put(crud.updateDataWrapper('student_accomp'))
	.delete(crud.deleteDataWrapper('student_accomp'));

module.exports = router;
