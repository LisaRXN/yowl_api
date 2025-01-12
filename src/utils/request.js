const db = require("../database.js");

function request(stm, params = null, res) {

    db.connection.query(stm, params, (error, results) => {
    
        if (error) {
            console.log('Error connecting to the database:', error);
            return res.status(500).json({ error });
        }

        if (results.affectedRows === 0) {
            console.log("No data found for the given query.");
            return res.status(404).json({ message: "Data not found" });
        }

        if (!results || results.length === 0) {
            console.log("Query executed but no data returned.");
            return res.status(200).json({ results: [] });
        }
        

        console.log("Query success, sending results.");
        return res.status(200).json({ message: "Request successful", results });
    });
}

module.exports = request;
