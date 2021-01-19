const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema({
	Name: String,
	RollNo: Number,
	Attendance: Boolean,
	TodayDate: { type: Date, default: Date.now },
	age: { type: Number, min: 5, max: 20 },
});
const userData = mongoose.model("user", User);

module.exports = userData;
