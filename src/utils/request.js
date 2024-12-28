const db = require("../database.js");
const error_server = require("./error.js");


function request(stm, params = null, res) {
    db.connection.query(stm, params, (error, results) => {
    
        if (error_server(error, res)) {
            return res.status(500).json({error}); 
        }

        if (results.affectedRows === 0) {
            console.log("No data found for the given query.");
            return res.status(404).json({ message: "Data not found" });
        }

        if (!results || results.length === 0) {
            console.log("Query executed but no data returned.");
            return res.status(200).json({ results: [] });
        }
        
        return res.status(200).json({ message: "Request successfull", results }); 
        
    });
}



module.exports = request


