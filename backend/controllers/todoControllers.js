const connection = require("../config/databaseConnection");

module.exports.createTodo = async (req, res) => {
	const { user } = req;
	const { todo, status,id } = req.body;

    if(!(todo && status)){
        return res.status(404).json({success: false, message:"Todo and status are required"})
    }

	const data = {
		id,
		user: user?.id,
		todo,
		status,
	};

	const sql = `insert into todos set ?`;
	connection.query(sql, [data], (error, result) => {
		if (error) {
			return res.status(409).json({ success: false, message: error });
		}

		return res.json({
			success: true,
			message: "Todo is added successfully",
			todo: data,
		});
	});
};


//*********************** UPDATE TODO  *************************************** */
module.exports.updateTodo = async (req, res) => {
    const { user } = req;
	const { id, status } = req.body;
    
    if(!(id && status)){
        return res.status(404).json({success: false, message:"id and status are required"})
    }

	const sql = `update todos set ? where id= "${id}" and user= "${user.id}"`;
	connection.query(sql, [{status}], (error, result) => {
		if (error) {
			return res.status(409).json({ success: false, message: error });
		}

		return res.json({
			success: true,
			message: "Todo is updated successfully",
		});
	});
};




//*********************** FETCH TODOS  *************************************** */
module.exports.fetchTodos = async (req, res) => {
    const { user } = req;

    const sql=`select * from todos where user=?`
    connection.query(sql, [user.id], (error, result) => {
		if (error) {
			return res.status(409).json({ success: false, message: error });
		}

		return res.json({
			success: true,
			message: "Todos fetch successfully",
            todos:result
		});
	});
}


