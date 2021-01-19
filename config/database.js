let mongoose = require("mongoose");
const userData = require("../model/User");
const clientData = require("../model/client");
//let settings = require("./settings.json");
const pass = "oxk5C264ulZAkLbP";
let cluster = `mongodb+srv://test-now:${pass}@cluster0.3tun2.mongodb.net/test_now?retryWrites=true&w=majority`;
//let dbUrl = `mongodb://${settings.DB_HOST}:${settings.DB_PORT}/${settings.DATABASE}`;

mongoose.Promise = global.Promise;
mongoose.connect(cluster, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

mongoose.connection.on("connected", function () {
	console.log("Mongoose default connection ");
});

mongoose.connection.on("error", function (err) {
	console.log("Mongoose default connection has occured " + err + " error");
});

mongoose.connection.on("disconnected", function () {
	console.log("Mongoose default connection is disconnected");
});

process.on("SIGINT", function () {
	mongoose.connection.close(function () {
		console.log(
			"Mongoose default connection is disconnected due to application termination",
		);
		process.exit(0);
	});
});

module.exports = { mongoose, userData, clientData };
