const userModule = require('../module/module.user');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


module.exports = {
    register: (async (req, res) => {
        let userName = req.query.userName;
        let password = req.query.password;
        let email = req.query.email;
        let age = req.query.age;
        let currentJob = req.query.currentJob;
        let CityName = req.query.CityName;
        let address = req.query.address;

        let user = new userModule({
            _id: mongoose.Types.ObjectId(),
            username: userName,
            password: password,
            email: email,
            age: age,
            currentJob: currentJob,
            CityName: CityName,
            address: address,
        })

        let checkuser = await userModule.find({ username: userName });

        (checkuser.length != 0)
            ? res.send({ status: 200, message: 'User already exists' })
            : user.save().then(() => res.send({ status: 200, message: 'User add Sucessfuly',data:req.body}));
    }),
    login: async (req, res) => {
        let userName = req.query.userName;
        let password = req.query.password;
        const accessToken = jwt.sign(userName, process.env.Access_KEY);
        let getUser = await userModule.find({ username: userName });
        if(getUser.length  == 1){
            (getUser[0].password == password)
            ? res.send({ status: 200, message: 'Login Sucessfuly', accessToken: accessToken })
            : res.send({ status: 200, message: 'Wrong Password' });
        }else{
            res.send({ status: 200, message: 'User not found' });
        }
    },
    showMyCity: async (req, res) => {
        let userName = req.query.userName;
        let user = await userModule.findOne({ username: userName });
        let cityName = user.CityName;
        res.send({ status: 200, CityName: cityName });
    },
    updatePassword: async (req, res) => {
        let userName = req.query.userName;
        let password = req.query.password;
        let newPassword = req.query.newPassword;
        let user = await userModule.findOne({ username: userName });
        if(user.password == password){
            user.password = newPassword;
            user.save().then(() => res.send({ status: 200, message: 'Password Sucessfuly' }));
        }else{
            res.send({ status: 200, message: 'Wrong Password' });
        }
    },
    deleteAccount: async (req, res) => {
        let userName = req.query.userName;
        let user = await userModule.findOne({ username: userName });
        user.remove().then(() => res.send({ status: 200, message: 'User Sucessfuly Deleted' }));
    }
    
};

