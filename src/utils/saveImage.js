const fs = require("fs");
const {Buffer} = require('buffer');
const path = require("path");

function saveImage(base64Image, imageName) {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const filePath = path.resolve("public/images", imageName);
  
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, imageBuffer, (err) => {
        if (err) return reject(err);
        resolve(`/images/${imageName}`);
      });
    });
  }

  module.exports = saveImage
