var express = require("express");
var router = express.Router();
const Joi = require("joi");
const { userData, clientData } = require("../config/database");
/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});
router.get("/allUser", async (req, res) => {
	try {
		const findAllUser = await userData.find();
		if (findAllUser) {
			return res.json({
				message: "",
				error: false,
				data: findAllUser,
			});
		}
		return res.json({
			message: "Something went wrong or user not found",
			error: true,
			data: "",
		});
	} catch (err) {
		console.log(err);
	}
});
router.post("/createUser", async (req, res) => {
	const { body } = req;
	const userSchema = Joi.object({
		Name: Joi.string().required(),
		RollNo: Joi.number().required(),
		Attendance: Joi.boolean().required(),
		age: Joi.number().min(5).max(20).required(),
	});
	try {
		const { error } = userSchema.validate(body);
		if (error) {
			return res.json({
				message: "",
				error: error.message,
				data: "",
			});
		}
		const findIfExist = await userData.findOne({
			Name: body.Name,
		});
		if (findIfExist) {
			return res.json({
				message: "User Already Exist!",
				error: true,
				data: "",
			});
		}

		const createUser = await userData.create(body);
		if (!createUser) {
			return res.json({
				message: "something went wrong",
				error: true,
				data: "",
			});
		}
		return res.json({
			message: "User Created Successfully",
			error: false,
			data: "",
		});
	} catch (err) {
		console.log(err);
	}
});
router.post("/clientMessage", async (req, res) => {
	const { body } = req;
	const clientSchema = Joi.object({
		Name: Joi.string().required(),
		Email: Joi.string().email().required(),
		Subject: Joi.string().required(),
		Message: Joi.string().required(),
	});
	try {
		const { error } = clientSchema.validate(body);
		if (error) {
			return res.json({
				message: "",
				error: error.message,
				success: false,
			});
		}
		const createUser = await clientData.create(body);
		if (!createUser) {
			return res.json({
				message: "something went wrong",
				success: false,
			});
		}
		return res.json({
			message: "Thank You",
			success: true,
		});
	} catch (err) {
		console.log(err);
	}
});
router.get("/getClientMessage", async (req, res) => {});
module.exports = router;
