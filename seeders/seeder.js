const { connection } = require("../src/database");
const seedUsers = require("./userSeeder");
const seedReviews = require("./reviewsSeeder");
const seedBusiness = require("./businessSeeder");

const createTablesIfNotExist = () => {
    return new Promise((resolve, reject) => {
      const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstname VARCHAR(255) NOT NULL,
          lastname VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          country VARCHAR(255) NOT NULL,
          role INT,
          avatar VARCHAR(255) NOT NULL
        );
      `;
  
      const createBusinessTableQuery = `
        CREATE TABLE IF NOT EXISTS business (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          address VARCHAR(255),
          web VARCHAR(255),
          notation FLOAT,
          image VARCHAR(255),
          slug VARCHAR(255),
          category_id INT
        );
      `;
  
      const createReviewsTableQuery = `
        CREATE TABLE IF NOT EXISTS reviews (
          id INT AUTO_INCREMENT PRIMARY KEY,
          business_id INT NOT NULL,
          user_id INT NOT NULL,
          rating INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          createdAt DATE NOT NULL,
          category_id INT,
          likes INT
        );
      `;
  
      const createCommentsTableQuery = `
        CREATE TABLE IF NOT EXISTS comments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          review_id INT NOT NULL,
          user_id INT NOT NULL,
          rating INT NOT NULL,
          created_at DATETIME NOT NULL,
          comment VARCHAR(255) NOT NULL
        );
      `;
  
      const createLikesTableQuery = `
        CREATE TABLE IF NOT EXISTS likes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          review_id INT NOT NULL,
          user_id INT NOT NULL,
          is_liked TINYINT NOT NULL,
          comment VARCHAR(255),
          created_at DATETIME
        );
      `;
  
      const createCategoriesTableQuery = `
        CREATE TABLE IF NOT EXISTS categories (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          text VARCHAR(255)
        );
      `;
  
      connection.query(createUsersTableQuery, (err) => {
        if (err) return reject(err);
  
        connection.query(createBusinessTableQuery, (err) => {
          if (err) return reject(err);
  
          connection.query(createReviewsTableQuery, (err) => {
            if (err) return reject(err);
  
            connection.query(createCommentsTableQuery, (err) => {
              if (err) return reject(err);
  
              connection.query(createLikesTableQuery, (err) => {
                if (err) return reject(err);
  
                connection.query(createCategoriesTableQuery, (err) => {
                  if (err) return reject(err);
                  resolve();
                });
              });
            });
          });
        });
      });
    });
  };
  

const seedDatabase = async () => {
  try {
    console.log("Début du seeding...");

    // Créer les tables si elles n'existent pas
    await createTablesIfNotExist();

    // Vider les tables avant d'ajouter de nouvelles données
    await deleteAllData();

    // Lancer les seeders pour les utilisateurs et les entreprises
    await seedUsers();
    await seedReviews();
    await seedBusiness();

    console.log("Seeding terminé avec succès !");
  } catch (error) {
    console.error("Erreur lors du seeding :", error.message);
  } finally {
    connection.end(); // Ferme la connexion une fois le seeding terminé
  }
};

const deleteAllData = () => {
  return new Promise((resolve, reject) => {
    // Supprimer les utilisateurs
    connection.query("DELETE FROM users", (err) => {
      if (err) reject(err);

      // Réinitialiser l'auto-incrémentation des utilisateurs
      connection.query("ALTER TABLE users AUTO_INCREMENT = 1", (err) => {
        if (err) reject(err);

        // Supprimer les entreprises
        connection.query("DELETE FROM business", (err) => {
          if (err) reject(err);

          // Réinitialiser l'auto-incrémentation des entreprises
          connection.query("ALTER TABLE business AUTO_INCREMENT = 1", (err) => {
            if (err) reject(err);

            // Supprimer les reviews
            connection.query("DELETE FROM reviews", (err) => {
              if (err) reject(err);

              // Réinitialiser l'auto-incrémentation des reviews
              connection.query(
                "ALTER TABLE reviews AUTO_INCREMENT = 1",
                (err) => {
                  if (err) reject(err);
                  resolve();
                }
              );
            });
          });
        });
      });
    });
  });
};

seedDatabase();
