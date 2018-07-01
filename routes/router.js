const express = require('express');
const jwt = require('jsonwebtoken');

const user = require('../controls/user');
const hospital = require('../controls/hospital');
const api = require('../api');
const secret = require('../config').secret;

const router = express.Router();

router.use(function (req, res, next) {
    console.log(`>>> recieve request: ${req.path}`);
    next();
});

// we don't check token when login
router.post(api.userLogin, user.login);

// route middleware to authenticate and check token
router.use(function (req, res, next) {
    // check header or URL parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
	// verify secret and checks exp
	jwt.verify(token, secret, (err, decoded) => {
	    if (err) {
		res.json({code: 403, msg: '认证失败'});
		console.log('>>> JWT authencation error!');
		return;
	    } else {
		req.decoded = decoded;
		console.log(`>>> decoded JWT payload: user_id = ${req.decoded.user_id}, user_name = ${req.decoded.user_name}, role = ${req.decoded.role}`);
		next();
	    }
	});
    } else {
	res.json({code: 403, msg: '未认证'});
	console.log('>>> JWT no tocken!');
    }
});

// user
router.get(api.userList, user.fetchAll);
// router.get(api.userLogout, user.logout);

router.post(api.userAdd, user.addOne);
router.post(api.userDelete, user.deleteOne);
router.post(api.userDeleteMulti, user.deleteMulti);
router.post(api.userChangeRole, user.controlVisit, user.changeRole);

// hospital
router.get(api.hospitalList, hospital.fetchAll);

router.post(api.hospitalDetail, hospital.fetchById);
router.post(api.hospitalDelete, hospital.deleteOne);
router.post(api.hospitalAdd, hospital.addOne);
router.post(api.hospitalDeleteMulti, hospital.deleteMulti);


module.exports = router;
