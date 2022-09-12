// usei esse arquivo para simular uma base de dados, somente como exemplo

// senha 1: senha1
// senha 2: senha2
// senha 3: senha3

const db = {
	users: [
		{
			username: "joao",
			password: "$2b$10$7Ll7YZ6UusFcMeetaDd9GeevXPEXaL6yRlmCohIkr9R2Ds6OkcERm",
			id: 1,
		},
		{
			username: "maria",
			password: "$2b$10$Z7pfv4ILdmaXM2RnGkHyvewgZ1JaEPl5/Kd90A2NtmxJoFUJV/TgO",
			id: 2,
		},
		{
			username: "jose",
			password: "$2b$10$/zUKTZdCI.aEdf8mewIlUOXPufGxZE/5ie3ajn686WUi9kjBlggsS",
			id: 3,
		},
	],
	tasks: [
		{
			id: 1,
			userId: 1,
			task: "wake up",
		},
		{
			id: 2,
			userId: 1,
			task: "take a shower",
		},
		{
			id: 3,
			userId: 1,
			task: "go to meeting",
		},
		{
			id: 4,
			userId: 2,
			task: "eat a banana",
		},
		{
			id: 5,
			userId: 2,
			task: "go to gym",
		},
		{
			id: 6,
			userId: 3,
			task: "pay bills",
		},
	],
};

module.exports = db;
