const userController = require('../controller/controller.user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.send({status:401,message:'Please Provide TOKEN'});

    jwt.verify(token, process.env.Access_KEY, (err, decoded)=> {
        if (err) return res.send({status:401,message:`${err}`});
        req.user = decoded;
        next();
    })
}

router.post('/reg', userController.register);

router.post('/login', userController.login);

router.get('/showMyCity',authenticateToken, userController.showMyCity);

router.put('/updatePassword',authenticateToken, userController.updatePassword);

router.delete('/deleteAccount',authenticateToken, userController.deleteAccount);



module.exports = router;