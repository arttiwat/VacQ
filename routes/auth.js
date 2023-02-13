const express = require('express');
const {register, login,getMe} = require('../controllers/auth');

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register',register);
router.post('/login',login);        //มีสั่ง POST ตามที่เส้นทางที่กำหนดให้ส่งไปที่ Function Login
router.get('/me',protect,getMe);

module.exports = router;