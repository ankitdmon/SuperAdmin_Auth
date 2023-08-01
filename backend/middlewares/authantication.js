const jwt = require('jsonwebtoken');
const connection = require("../config/databaseConnection");


const authantication = (req, res, next) => {
	const { token } = req.cookies;
	// const { token } = req.body;

	if (!token) {
		return res
			.status(501)
			.json({ success: false, message: "Please login to update your details" });

        }

	    jwt.verify(token,process.env.JWT_SECRET,(error,data) =>{
            if (error) res.status(501).json({success:false,message:"Invalid user"});
            else{
                if(data?.id){
                    const sql='select * from users where id=?';
                    connection.query(sql,[data.id],(err,result)=>{
                        if(err){
                            console.log(err)
                            return res.status(500).json({success:false,message:"invalid user"});
                        }else if(result.length){
                            req.user = result[0];
                            next();
                        }else{ 
                            return res.status(500).json({success:false,message:"invalid user"});
                        }
                    })
                }else{
                    return res.status(500).json({success:false,message:"invalid user2"});
                }

            }
          
    });

};

module.exports = authantication;
