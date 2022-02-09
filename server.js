const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose  = require('mongoose')

const createUser = require('./users/createUser')
const addExercise = require('./users/addExercise')
const getLogs = require('./users/getLogs')

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req,res)=>{
  try {
    const user = req.body.username
    const {username,_id} = await createUser(user)
    console.log(username,_id)
    res.send({username,_id})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})
app.post('/api/users/:user/exercises', async (req,res)=>{
  try {
    const {description,duration,date} = req.body
    const {user} = req.params
    const data = await addExercise(user,{description,duration,date})
    res.send(data)
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})

app.get('/api/users/:user/logs', async (req,res)=>{
  try {
    const {user} = req.params
    const {from=null,to=null,limit=null} = req.query
    const data = await getLogs(user,{from,to,limit})
    res.send(data)
  } catch (error) {
    res.status(500).send({error: error.message})
  }

})

const connectMongo = async () =>{ 
  await mongoose.connect(process.env.MONGOURI)
  console.log('connected to mongo')
}


connectMongo().catch(err => console.log(err))
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
