//подключение express
const express = require('express')
//создаем объект приложения
const app = express()
const port = 5000

app.use(express.static('styles'))
app.use('/css', express.static(__dirname + 'styles/css'))
app.use(express.static(__dirname))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
	res.render('main')
})

app.get('/todos.json', (req, res) => {
	res.sendFile(__dirname + '/todos.json')
})

app.listen(port, () => console.info(`Запуск сервера -> ${port}`))
