const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "..", "backend", "upload"));
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `${crypto.randomBytes(16).toString("hex")}-${file.fieldname}${extension}`);
    }
});

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
        fields: 20
    },
    fileFilter: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        if (!allowedImageTypes.has(file.mimetype) || !allowedExtensions.has(extension)) {
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
        }
        cb(null, true);
    }
});

const carImageUpload = upload.fields([
    { name: "carImage", maxCount: 1 }
]);

module.exports = {
    carImageUpload
};
