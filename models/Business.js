const { connection } = require('../src/database');

const Business = {
    create({ name, web, description, image, category_id}) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO business (name, web, description, image, category_id) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [name, web, description, image, category_id], (err, result) => {
                if (err) reject(err);
                resolve(result.insertId); 
            });
        });
    },

    getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM business';
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    deleteAll() {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM business';
            connection.query(query, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};

module.exports = Business;
