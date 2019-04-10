const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

app.get('/test', (req, res)=> {
	res.send({msg: 'hello world'})
})

app.get('/', (req, res)=> {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(5555, () => {
	console.log('Example app listening on port 5555: http://localhost:5555')
})
