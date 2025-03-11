const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  // cloudinary: cloudinary,  
  params: async (req, file) => {
    console.log("File being uploaded:", file.originalname);
    console.log("Mimetype:", file.mimetype);

    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(file.mimetype)) {
      throw new Error(`Unsupported file type: ${file.mimetype}`);
    }

    const originalName = file.originalname.split(".")[0];
    const sanitizedFilename = originalName.replace(/\s+/g, "_");

    return {
      folder: `ecommerce_products/${req.user?.id || "guest"}`, // Adjust folder path as needed
      resource_type: "image", // Ensure resource type is set to image
      public_id: sanitizedFilename,
      overwrite: false,
      invalidate: true,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;