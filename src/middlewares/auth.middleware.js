
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
  
//     if (token == null) return res.sendStatus(401)
  
//     jwt.verify(token, "shhhhhhared-secret", (err, user) => {
//       console.log(err)
  
//       if (err) return res.sendStatus(403)
  
//       req.user = user
  
//       next()
//     })
// }

// module.exports = authenticateToken;



const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token du header

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    // Vérifier la signature du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décoder le token avec la clé secrète
    req.user = decoded; // Ajouter l'utilisateur décodé à la requête pour y accéder plus tard
    next(); // Passer à la route suivante
  } catch (error) {
    res.status(401).send('Invalid or expired token', error);
  }
};


module.exports = authenticateJWT;
