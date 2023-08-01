const jwt = require("jsonwebtoken");
const connection = require("../config/databaseConnection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { getFileURL } = require("../utils/fileUploadFunction");

//****************************************** SIGNUP FUNCTIONALITY ********************************************************** */
module.exports.signUp = async (req, res) => {
	//extract user details from request body
	const { name, email, password, photo } = req.body;

	//validate user input
	if (!(name && email && password)) {
		return res.status(400).json({
			success: false,
			message: "name, email and password are required",
		});
	}

	//Encrypt password
	const encryptedPassword = await bcrypt.hash(password, 10);

	//check if user already exists
	const sql = "select * from users where email= ? ";
	connection.query(sql, [email], (err, result) => {
		if (err) {
			return res.status(409).json({ success: false, message: error });
		}

		if (result.length) {
			return res.status(400).json({
				success: false,
				message: "User already exists",
			});
		} else {
			//insert user into database
			const userData = {
				id: uuidv4(),
				name,
				email,
				password: encryptedPassword,
				photo,
			};

			const insertQuery = "insert into users set ?";
			connection.query(insertQuery, [userData], (err, result) => {
				if (err) {
					return res.status(409).json({ success: false, message: error });
				}
				return res.status(201).json({
					success: true,
					message: "User created successfully",
				});
			});
		}
	});
};

//*********************************** LOGIN FUNCTIONALITY ************************************************ */
module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		return res.status(400).json({
			success: false,
			message: "email and password are required",
		});
	}

	const sql = "select * from users where email=?";
	connection.query(sql, [email], (err, result) => {
		if (err) {
			return res.status(409).json({ success: false, message: error });
		}
		if (!result.length) {
			return res.status(400).json({
				success: false,
				message: "User not found",
			});
		}

		//compare password
		bcrypt.compare(password, result[0].password, (err, match) => {
			if (err) {
				return res.status(409).json({ success: false, message: error });
			}

			if (match) {
				//create token
				const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET);

				//configure cookies
				const cookiesConfig = {
					expires: new Date(
						Date.now() + 10 * 24 * 60 * 60 * 1000 //cookie expires in 10 days
					),
					httpOnly: true,
				};

				result[0].password = undefined; // ! do not send password as a response
				return res.cookie("token", token, cookiesConfig).status(200).json({
					success: true,
					message: "Login successful",
					user: result[0],
					token,
				});
			} else {
				return res.status(400).json({
					success: false,
					message: "Invalid password",
				});
			}
		});
	});
};

// ******************************************** UPDATE USER DEATAILS (INCLUDING IMAGE) *********************************************
module.exports.updateUser = async (req, res) => {
	const { user } = req; // from authantication middleware
	const { name, email } = req.body;

	if (!Object.keys(req.body).length) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid information" });
	}

	if (user?.id) {
		//update user details
		const updateQuery = `update users set ? where id = "${user?.id}"`;
		const updateData = {
			name,
			email,
			photo: req.file && getFileURL(req), //req.file comming from middleware
		};
		connection.query(updateQuery, [updateData], (err, result) => {
			if (err) {
				return res.status(409).json({ success: false, message: error });
			}
			
			return res
				.status(200)
				.json({ success: true, message: "User updated successfully",user:updateData });
		});
	}
};


// ********************************************* CHANGE PASSWORD FUNCTIONALITY *****************************************************
module.exports.changePassword = async (req, res) => {
	const { newPassword, oldPassword } = req.body;
	const { user } = req;

	if (!(newPassword && oldPassword))
		return res.status(401).json({
			success: false,
			message: "Old password and new password is required",
		});

	const encryptedNewPass = await bcrypt.hash(newPassword, 10);

	if (user?.id) {
		bcrypt.compare(oldPassword, user?.password, (err, match) => {
			if (err) throw err;
			else if (!match) {
				return res
					.status(404)
					.json({ success: false, message: "invalid old password" });
			} else {
				const updateQuery = `update users set ? where id = "${user?.id}"`;
				connection.query(
					updateQuery,
					[{ password: encryptedNewPass }],
					(error, data) => {
						if (error) {
							return res.status(409).json({ success: false, message: error });
						}
						return res.status(200).clearCookie("token").json({
							success: true,
							message: "Password changed successfully",
						});
					}
				);
			}
		});
	}
};

//************************************* CHECK ALREADY LOGGED IN USER ********************************************** */
module.exports.isAuthanticated = async (req, res) => {
	const {user}=req;

	if(user){
		const sql=`select * from users where id = ? and email = ?`;
		connection.query(sql,[user.id,user.email],(err,result)=>{
			if(err) throw err;
			if(result.length){
				result[0].password = undefined;
				res
				  .status(200)
				  .json({ success: true, message: "you are already loggedin", user:result[0] });
			}
		
		})
	}

  };

  /***************************************** LogOut functionality ******************************************* */

  module.exports.logout = async (req, res) => {

	const { user } = req;
	if (!user?.id) {
	  res.status(401).json({ success: false, message: "already logged out" });
	} else {
	  res.clearCookie("token");
	  res.status(200).json({ success: true, message: "Logout success" });
	}
  };