var express = require('express');

var app  = express();
 app.use(express.static(__dirname + '/public'));

var fortune = require('./lib/fortune.js');

// set up handlebars view engine
const handlebars = require('express3-handlebars')
         .create({ defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
          res.render('home');
          
});

app.get('/about', function(req, res){
          res.render('about', { fortune: fortune.getFortune()});
       
});


// 404 catch-all handler (middleware)
app.use(function(req, res){
        res.status(404);
        res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
console.error(err.stack);
res.status(500);
res.render('500 - Server Error');

});


app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' + app.get('port') + '; press ctrl-c to terminate.');
});

