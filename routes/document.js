var router = require('express').Router();
var Entity = require('../models/entity');


router.get('/test', function(req, res, next){
	res.render('accounts/signup', {
		errors: req.flash('errors')
	});
});


router.post('/test', function(req, res, next) {
	var user = new User();
	
	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;
	//user.profile.picture = user.gravatar();

	User.findOne({ email: req.body.email }, function(err, existingUser){

		if(existingUser){
			//console.log(req.body.email + " is already exist");
			req.flash('errors', 'Account with that email address already exists');
			return res.redirect('/signup');
		} else {
			user.save(function(err, user){
				if(err) return next(err);
				
				//res.json("New user has been created");
				req.logIn(user, function(err){
					if (err) return next(err);
					res.redirect('/profile');
				});
			});
		}// mongoose func: find only one document in user database
	});
});