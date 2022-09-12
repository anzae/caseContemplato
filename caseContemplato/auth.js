const jwt = require("jsonwebtoken");

exports.authenticateToken = function (req, res, next) {
	const token = req.cookies.authorization;
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, "a random string here 12345-54321", (err, user) => {
		if (err)
			return res.status(500).json({ message: "Failed to authenticate token." });
		req.user = user;
		// if the token is valid, go to next middleware
		next();
	});
};
