const mongoose = require('mongoose');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

const getLogin = (req, res, next) => {
    if(req.session.userId){
        return res.redirect('/');
    }
    res.render('login', {title: "Login", username: "", password: "", error: null});
};

const getSignup = (req, res, next) => {
    if(req.session.userId){
        return res.redirect('/');
    }
    res.render('signup', {title: "Signup", username: "", password: "", passwordConfirmed: "", email: "", error: null});
};

const postSignup = (req, res, next) => {
    if(req.session.userId){
        return res.redirect('/');
    }
    let {username, password, passwordConfirmed, email} = req.body;
    if(username == "" || password == "" || passwordConfirmed == "" || email == ""){
        return res.render("signup", {title: "Login", username, password, passwordConfirmed, email, error: "All fields are required"});
    }
    else if(password != passwordConfirmed){
        return res.render("signup", {title: "Login", username, password, passwordConfirmed, email, error: "Confirmed password doesn't match password"});
    }
    else {
        UserModel.create({username, password, email}, (err, user) => {
            if(err){
                res.render("signup", {title: "Signup", username, password, passwordConfirmed, error: "Username must be unique"});
            }
            else {
                req.session.userId = user._id;            
                res.redirect("/albums");
            }
        });
    }
};

const postLogin = (req, res, next) => {
    if(req.session.userId){
        return res.redirect('/');
    }
    let {username, password} = req.body;
    if(username == "" || password == ""){
        return res.render("login", {title: "Login", username, password, error: "All fields are required"});
    }
    UserModel.findOne({username}, (err, user) => {
        if(user){
            bcrypt.compare(password, user.password, (err, same) => {
                if(same){
                    req.session.userId = user._id;
                    res.redirect("/albums");
                }
                else {
                    res.render("login", {title: "Login", username, password, error: "Wrong password"});
                }
            })
        }
        else{
            res.render("login", {title: "Login", username, password, error: "Error try again"});
        }
    });
};

const getLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

module.exports = {
    getLogin,
    getSignup,
    postSignup,
    postLogin,
    getLogout
};
