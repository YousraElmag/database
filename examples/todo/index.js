const Express = require('express')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')

const app = Express()

app.use(bodyParser.json())

const {list, create, update, remove, clear, markAsDone, markAsNotDone} = require('./actions')

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update)
app.delete('/todos/:id', remove)
app.delete('/todos', clear)
app.post('/todos/:id/done', markAsDone)
app.delete('/todos/:id/done', markAsNotDone)

app.listen(3000)

Todo.init()
