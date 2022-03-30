if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const express = require('express')
app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true 
})
const port = process.env.PORT || 8080
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

app.use(express.static(__dirname + '/static'))

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
