const { connection } = require('../src/database');

const Reviews = {
    create({ rating, title, content, user_id, business_id, createdAt}) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO reviews (rating, title, content, user_id, business_id, createdAt) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(query, [rating, title, content, user_id, business_id, createdAt], (err, result) => {
                if (err) reject(err);
                resolve(result.insertId); // Retourne l'ID de l'utilisateur ajouté
            });
        });
    },

    getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM reviews';
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    deleteAll() {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM reviews';
            connection.query(query, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};

module.exports = Reviews;
