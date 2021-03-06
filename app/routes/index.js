const { response } = require('express');

module.exports = (function(client) {
    'use strict';
    const express = require('express');
    const bodyParser = require('body-parser');
    const passport = require('passport')
    const LocalStrategy = require('passport-local').Strategy
    const session = require('express-session');
    const config = require('../config');
    const path = require('path');
    const axios = require('axios').default;
    const router = express.Router();
    const Workout = require('../bin/Workout');

    const wo = new Workout(client);
    
    router.use('/static', express.static(path.join(__dirname + '/../static'))); // Set default static files path
    router.use(bodyParser.json({limit:'5mb'}));
    router.use(bodyParser.urlencoded({
        extended: true,
        limit:'5mb'
    }));

    // For authentication - start
    router.use(session({
        secret: config.session,
        resave: false,
        saveUninitialized: false
    }))
    router.use(passport.initialize())
    router.use(passport.session())

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
      }, async (req, email, password, done) => {
        try {
          const name = req.body;
          console.log(name);
          return done(null, name);
        } catch (error) {
          done(error);
        }
    }));

    passport.use(new LocalStrategy(
        function(username, password, done) {
            if(username && password){
                username = username.trim();
                password = password.trim();
                connection.query(`SELECT password FROM users WHERE username="${username}";`, (error, result, fields) => {
                    let userPass = result[0];
                    if(userPass){
                        userPass = userPass.password;
                        return done(null, false);
                    }else{
                        return done(null, false);
                    }
                });
            }
        }
    ))
    
    passport.authenticationMiddleware = function authenticationMiddleware(){
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next()
            }
            res.redirect('/login')
        }
    };

    // For authentication - end 

    router.get('/', (req, res) => {
        res.render('./pages/index.ejs', {root: '../' + __dirname});
    });

    router.get('/workout/list/', (req, res) => {
        wo.getClientWorkout(1).then(result => {
            res.render('./pages/app.ejs', {data: result, type: "workout-list"});
        });
    });

    router.get('/workout/list-t', (req, res) => {
        wo.getTrainerWorkout(1).then(result => {
            res.render('./pages/app.ejs', {data: result, type: "workout-list-t"});
        });
    });

    router.get('/trainer/search', (req, res) => {
        wo.getClientWorkout(5).then(result => {
            res.render('./pages/search.ejs', {data: result, type: "search"});
        });
    });

    router.post('/trainer/searchTrainer', (req, res) => {
        const category = req.body.category;
        console.log(category);
        const result = {
            name: "Денис Осадчий",
            id: 1
        }
        res.send(JSON.stringify(result));
    });
    
    router.post('/register',
      passport.authenticate('signup', { successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: false })
    );

    router.post('/login',
      passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false })
    );

    // Logout page
    router.get('/logout', function (req, res){
        req.session.destroy(function (err) {
          res.redirect('/');
        });
    });

    // Error page
    router.use(function(req, res, next){
        res.status(404);
        res.render('./error/404.ejs', {root: '../' + __dirname});
    });

    return router;
});