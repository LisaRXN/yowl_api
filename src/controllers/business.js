const db = require("../database.js");
const request = require("../utils/request.js");
const saveImage = require("../utils/saveImage.js");


// function create(req, res) {
//   const { name, description, web, image, rating, title, content, user_id, category_id } = req.body;
//   const createdAt = new Date();

//   // Check if the business already exists
//   const stm_check_business = "SELECT * FROM business WHERE name = ?";
//   const params_business = [name];
//   db.connection.query(stm_check_business, params_business, (error, results) => {
//     if (error) {
//       console.error("Database error:", error);
//       return res.status(500).json({ error: "Server error while checking business." });
//     }
//     if (results.length > 0) {
//       return res.status(400).json({ error: "This review already exists." });
//     }

//     // If not, create business
//     try {
      
//       const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
//       const imageBuffer = Buffer.from(base64Data, "base64");
//       const filename = `${Date.now()}_${name.replace(/\s+/g, "_")}.jpg`;
//       const filePath = path.join("public/images", filename);

//       fs.writeFile(filePath, imageBuffer, (err) => {
//         if (err) {
//           console.error("Error saving image:", err);
//           return res.status(500).json({ error: "Error saving image." });
//         }


//         const stm_insert_business = "INSERT INTO business (name, description, web, image, category_id) VALUES (?, ?, ?, ?, ?)";
//         const imageName = `/images/${filename}`
//         const params_insert_business = [name, description, web, imageName, category_id];

//         db.connection.query(stm_insert_business, params_insert_business, (error, results) => {
//           if (error) {
//             console.error("Database error:", error);
//             return res.status(500).json({ error: "Error creating business." });
//           }

//           // create review
//           const businessId = results.insertId;
//           const params_insert_review = [rating, title, content, businessId, user_id, createdAt];
//           const stm_insert_review = `
//             INSERT INTO reviews (rating, title, content, business_id, user_id, createdAt) VALUES (?, ?, ?, ?, ?, ?)`;
          
//           db.connection.query(stm_insert_review, params_insert_review, (error, results) => {
//             if (error) {
//               console.error("Database error:", error);
//               return res.status(500).json({ error: "Error creating review." });
//             }
//             res.json({
//               message: "Business and review created successfully!",
//               businessId: businessId,
//               reviewId: results.insertId,
//             });
//           });
//         });
//       });
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       return res.status(500).json({ error: "Unexpected server error." });
//     }
//   });
// }

function create(req, res) {
  const { name, description, web, image, rating, title, content, user_id, category_id } = req.body;
  const createdAt = new Date();
  const defaultAvatar = "/images/image.png";

  const stm_check_business = "SELECT * FROM business WHERE name = ?";
  const params_business = [name];

  db.connection.query(stm_check_business, params_business, async (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Error checking business." });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: "This business already exists." });
    }

    try {
      // Vérification de l'image (avatar par défaut si image est nulle)
      let imagePath = defaultAvatar;
      if (image) {
        const imageName = `${Date.now()}_${name.replace(/\s+/g, "_")}.jpg`;
        imagePath = await saveImage(image, imageName);
      }

      // Insertion du business
      const stm_insert_business = `
        INSERT INTO business (name, description, web, image, category_id) 
        VALUES (?, ?, ?, ?, ?)`;
      const params_insert_business = [name, description, web, imagePath, category_id];

      db.connection.query(stm_insert_business, params_insert_business, (error, businessResult) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ error: "Error creating business." });
        }

        // Insertion de l'avis
        const businessId = businessResult.insertId;
        const stm_insert_review = `
          INSERT INTO reviews (rating, title, content, business_id, user_id, createdAt) 
          VALUES (?, ?, ?, ?, ?, ?)`;
        const params_insert_review = [rating, title, content, businessId, user_id, createdAt];

        db.connection.query(stm_insert_review, params_insert_review, (error, reviewResult) => {
          if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Error creating review." });
          }

          res.json({
            message: "Business and review created successfully!",
            businessId: businessId,
            reviewId: reviewResult.insertId,
          });
        });
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).json({ error: "Unexpected server error." });
    }
  });
}

function business_all(req, res) {
  const stm = "SELECT * FROM business"; 
  const params = null;
  request(stm, params, res); 
}

function business_id(req,res){
  // const stm = "SELECT * FROM business WHERE id = ?";
  const stm = "SELECT *, business.name AS name, categories.name AS category FROM business INNER JOIN categories ON business.category_id = categories.id WHERE business.id = ?";
  const id = req.params.id;
  const params= [id]
  request(stm, params, res); 
}

function business_rating(req, res){
  const stm = "SELECT ROUND(AVG(rating),1) as rating,  COUNT(*) as reviews_number FROM reviews WHERE business_id = ?";
  const params = [req.params.id];
  request(stm, params, res); 
}

function business_category(req, res){
  const stm = "SELECT business.*, categories.name as category, categories.text FROM business INNER JOIN categories on business.category_id = categories.id WHERE business.category_id = ?";
  const params = [req.params.id];
  request(stm, params, res); 
}


module.exports = {business_all, business_id, business_rating, business_category, create}
