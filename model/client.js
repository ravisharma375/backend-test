const mongoose = require("mongoose");
const { Schema } = mongoose;
const Client = new Schema({
	Name: String,
	Email: String,
	Subject: String,
	TodayDate: { type: Date, default: Date.now },
	Message: String,
});
const clientData = mongoose.model("client", Client);

module.exports = clientData;
