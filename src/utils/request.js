const db = require("../database.js");
const error_server = require("./error.js");


function request(stm, params = null, res) {
    db.connection.query(stm, params, (error, results) => {
        
        if (error_server(error, res)) {
            return; 
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No data found" }); 
        }

        res.json({ message: "Request successfull", results }); 
        
    });
}


module.exports = request