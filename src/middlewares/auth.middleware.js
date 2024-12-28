const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token du header

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décode le token avec la clé secrète
    req.user = decoded; // Ajouter l'utilisateur décodé 
    next(); // Route suivante
  } catch (error) {
    res.status(401).send('Invalid or expired token', error);
  }
};


module.exports = authenticateJWT;
