const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJwt');
const crud = require('../controllers/crud');

router.use(authJwt.verifyToken);
router.use(authJwt.isFaculty);

router.get('/studentaccomps', crud.readAllDataWrapper('student_accomp'));

router
	.route('/organized')
	.post(crud.createDataWrapper('organized_event'))
	.get(crud.readAllDataWrapper('organized_event'))
	.put(crud.updateDataWrapper('organized_event'))
	.delete(crud.deleteDataWrapper('organized_event'));

router
	.route('/attended')
	.post(crud.createDataWrapper('attended_event'))
	.get(crud.readAllDataWrapper('attended_event'))
	.put(crud.updateDataWrapper('attended_event'))
	.delete(crud.deleteDataWrapper('attended_event'));

router
	.route('/publication')
	.post(crud.createDataWrapper('publication'))
	.get(crud.readAllDataWrapper('publication'))
	.put(crud.updateDataWrapper('publication'))
	.delete(crud.deleteDataWrapper('publication'));

module.exports = router;
