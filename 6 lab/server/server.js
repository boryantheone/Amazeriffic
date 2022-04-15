var express = require("express"),
	http = require("http"),
	// импортируем библиотеку mongoose
	mongoose = require("mongoose"),
	app = express();
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(res => {
	console.log("DB connect")
}).catch(err => {
	console.log(Error, err.message);
});

// Это модель) в папку part7 . Нам понадобится файл package.json , где Mongoose для задач
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [String]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
http.createServer(app).listen(3000);
console.log("Server start 3000")


app.get("/todos.json", function (req, res) {
	ToDo.find({}, function (err, toDos) {
		res.json(toDos);
	});
});

app.post("/todos", function (req, res) {
	console.log(req.body);
	var newToDo = new ToDo({
		"description": req.body.description,
		"tags": req.body.tags
	});
	newToDo.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
			// клиент ожидает, что будут возвращены все задачи,
			// поэтому для сохранения совместимости сделаем дополнитель) в папку part7 . Нам понадобится файл package.json , гденый запрос
			ToDo.find({}, function (err, result) {
				if (err !== null) {
					// элемент не был сохранен
					res.send("ERROR");
				}
				res.json(result);
			});
		}
	});
});

app.use(express.static('../client'))
app.use('/css', express.static(__dirname + '/styles/css'))
// app.use(express.static(__dirname))
app.use(express.json())

app.set('views', '../client/views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
	res.render('main')
})


















// //подключение express
// const express = require('express')
// http = require("http")
// //создаем объект приложения
// const app = express()
// const port = 5000

// var ToDoSchema = mongoose.Schema({
// 	description: String,
// 	tags: [ String ]
// 	});
// 	var ToDo = mongoose.model("ToDo", ToDoSchema);
// 	// начинаем слушать) в папку part7 . Нам понадобится файл package.json , где запросы
// 	http.createServer(app).listen(3000);


// app.use(express.static('styles'))
// app.use('/css', express.static(__dirname + 'styles/css'))
// app.use(express.static(__dirname))
// app.use(express.json())

// app.set('views', './views')
// app.set('view engine', 'ejs')

// app.get('', (req, res) => {
// 	res.render('main')
// })

// app.get('/todos.json', (req, res) => {
// 	res.sendFile(__dirname + '/todos.json')
// })

// app.listen(port, () => console.info(`Запуск сервера -> ${port}`))
