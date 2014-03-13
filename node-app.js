var express = require('express.io'),
    app = express().http().io(),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/test');

app.use(express.bodyParser());
app.use(express.static('./app'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'abc' }));

// Bootstrap models
require('./models/User');
//Bootstrap routes
require('./routes/routing')(app);

app.listen(9001);
console.log('Express server started on port 9001');
