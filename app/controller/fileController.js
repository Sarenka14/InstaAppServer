const jsonController = require("./jsonController");
const { imageObjectsArray } = require("../model");
const formidable = require("formidable")

module.exports = {
    add: async (req) => {
        const form = formidable({ uploadDir: 'uploads', keepExtensions: true });
        form.parse(req, (err, fields, files) => {
            jsonController.add(fields.album, files.file.name, files.file.path)
        });
    },
    get: async (id) => {
        for (let i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                return (imageObjectsArray[i].url)
            }
        }
    },
    getEdited: async (id, action) => {
        for (let i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                for (let j = imageObjectsArray[i].history.length - 1; j >= 0; j--) {
                    if (imageObjectsArray[i].history[j].status == action) {
                        return (imageObjectsArray[i].history[j].url)
                    }
                }
            }
        }
    }
}
