var express = require("express");
var router = express.Router();
const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const auth = require("../auth");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("login");
});

// post login
router.post("/login", function (req, res, next) {
	try {
		const { username, password } = req.body;
		if (!(username && password)) {
			res.status(400).send("All input is required");
		}
		const user = db.users.find((element) => element.username == username);
		if (!user) return res.status(400).json({ msg: "User not in database" });
		bcrypt.compare(password, user.password, (err, data) => {
			if (err) throw err;
			if (data) {
				const token = jwt.sign(
					{ user_id: user.id, username: user.username },
					"a random string here 12345-54321",
					{
						expiresIn: "1h",
					}
				);
				res.cookie("authorization", token, { httpOnly: true });
				return res.render("auth", { id: user.id, token: token });
			} else {
				return res.status(401).send("Invalid credential");
			}
		});
	} catch (err) {
		console.log(err);
	}
});

// get tasks
router.get("/tasks/:id", auth.authenticateToken, function (req, res, next) {
	const userId = req.params.id;
	if (userId == req.user.user_id) {
		const tasks = db.tasks.filter(function (el) {
			return el.userId == userId;
		});
		res.render("tasks", { tasks: tasks, id: userId });
	} else {
		return res.status(401).send("Invalid credential");
	}
});

// post tasks
router.post("/tasks/:id", auth.authenticateToken, function (req, res, next) {
	const userId = req.params.id;
	if (userId == req.user.user_id) {
		newTask = {
			id: db.tasks.length + 1,
			userId: userId,
			task: req.body.task,
		};
		db.tasks.push(newTask);
		const tasks = db.tasks.filter(function (el) {
			return el.userId == userId;
		});
		res.render("tasks", { tasks: tasks, id: userId });
	} else {
		return res.status(401).send("Invalid credential");
	}
});

// get api
router.get("/api", auth.authenticateToken, function (req, res, next) {
	const url = "https://swapi.dev/api/people";
	const userId = req.user.user_id;
	axios
		.get(url)
		.then((response) => {
			const names = response.data.results.map((el) => el.name);
			res.render("api", { people: names, id: userId });
		})
		.catch((error) => console.log(error));
});

module.exports = router;
