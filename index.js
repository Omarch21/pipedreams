if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}

var fs = require('fs');
const express = require('express')
app = express()
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
const res = require('express/lib/response');
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true 
})

const port = process.env.PORT || 8080
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/static'))

var registerschema = new mongoose.Schema({
  _id : String,
  name: String,
  age : Number
});
var user = mongoose.model('registered', registerschema);
app.get('/register/', (req,res) =>{
  fs.readFile(__dirname + '/static/register.html/', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
})

app.post('/register/done', function(req,res){


  -
  new user({
    _id : req.body.email,
    name : req.body.name,
    age : req.body.age
  }).save(function(err, doc){
    if(err) res.send('Username already in use');
    else res.send('successfully in');
  });
});
// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})



app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)

