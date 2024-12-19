const { connection } = require('../src/database');
const seedUsers = require('./userSeeder');
const seedReviews = require('./reviewsSeeder');
const seedBusiness = require('./businessSeeder');

// const seedBusinesses = require('./businessSeeder');

const seedDatabase = async () => {
    try {
        console.log('Début du seeding...');

        // Vider les tables avant d'ajouter de nouvelles données
        await deleteAllData();

        // Lancer les seeders pour les utilisateurs et les entreprises
        await seedUsers();
        await seedReviews();
        await seedBusiness();

        console.log('Seeding terminé avec succès !');
    } catch (error) {
        console.error('Erreur lors du seeding :', error.message);
    } finally {
        connection.end(); // Ferme la connexion une fois le seeding terminé
    }
};



const deleteAllData = () => {
    return new Promise((resolve, reject) => {
        // Supprimer les utilisateurs
        connection.query('DELETE FROM users', (err) => {
            if (err) reject(err);

            // Réinitialiser l'auto-incrémentation des utilisateurs
            connection.query('ALTER TABLE users AUTO_INCREMENT = 1', (err) => {
                if (err) reject(err);

                // Supprimer les entreprises
                connection.query('DELETE FROM business', (err) => {
                    if (err) reject(err);

                    // Réinitialiser l'auto-incrémentation des entreprises
                    connection.query('ALTER TABLE business AUTO_INCREMENT = 1', (err) => {
                        if (err) reject(err);

                        // Supprimer les reviews
                        connection.query('DELETE FROM reviews', (err) => {
                            if (err) reject(err);

                            // Réinitialiser l'auto-incrémentation des reviews
                            connection.query('ALTER TABLE reviews AUTO_INCREMENT = 1', (err) => {
                                if (err) reject(err);
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    });
};

seedDatabase();
