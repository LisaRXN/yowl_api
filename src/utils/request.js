const db = require("../database.js");
const error_server = require("./error.js");


function request(stm, params = null, res) {
    db.connection.query(stm, params, (error, results) => {
    
        if (error_server(error, res)) {
            return res.status(500).json({error}); 
        }

        if (!results || results.length === 0) {
            console.log("Error detected and response sent.");
            return res.status(200).json({ results: [] });
        }
        res.json({ message: "Request successfull", results }); 
        
    });
}



module.exports = request


