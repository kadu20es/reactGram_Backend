const multer = require("multer")
const path = require("path")

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ""

        if (req.baseUrl.includes("users")){
            folder = "users"
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)
    },

    // a fim de evitar substituição de imagens, renomeia a foto para hora, minuto, segundo e ms atuais + nome original
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        // checa se no fim do arquivo tem extensão jpg ou png
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // uploads only png and jpeg and pbg formats
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }