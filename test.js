var mongoose = require('mongoose'),
    User = require('./server/models/principal');

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    name:'jmar777',
    email:'elkanlsad',
    password:'Password123'
});

// save user to database
testUser.save(function(err,user) {
    if (err) throw err;

console.log(user);
// fetch user and test password verification
User.findOne({ name: 'jmar777' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -&gt; Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
    });
})
})