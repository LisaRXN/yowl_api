const { connection } = require('../src/database');

const User = {
    create({firstname,lastname, email,password, country, avatar, role = 0 }) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (firstname, lastname, email, password, country, avatar, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(query, [firstname, lastname, email, password, country, avatar, role], (err, result) => {
                if (err) reject(err);
                resolve(result.insertId); // Retourne l'ID de l'utilisateur ajouté
            });
        });
    },

    getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users';
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    deleteAll() {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users';
            connection.query(query, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};

module.exports = User;
