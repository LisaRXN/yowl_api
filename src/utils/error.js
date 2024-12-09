function error_server(error, res) {
    if (error) {
        console.error("Database query error:", error);

        if (res) {
            res.status(500).json({ error: "Internal Server Error" });
        }
        return true; 
    }
    return false; 
}

module.exports = error_server;