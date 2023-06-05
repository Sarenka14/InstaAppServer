const sharp = require("sharp");
const { imageObjectsArray } = require("../model");

module.exports = {
    getMetadata: (id) => {
        let founded = false
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                founded = true

                return new Promise(async (resolve, reject) => {
                    try {
                        if (imageObjectsArray[i].url) {
                            let meta = await sharp(imageObjectsArray[i].url).metadata()

                            resolve(meta)
                        }
                        else {
                            resolve("url_not_found")
                        }

                    } catch (err) {
                        reject(err.mesage)
                    }
                })
            }
        }
        if (!founded) {
            return 404
        }
    },
    rotate: async (id) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .rotate(90)
                    .toFile(url.substring(0, url.indexOf(".")) + "-rotated.jpg");

                imageObjectsArray[i].lastChange = "rotate"
                imageObjectsArray[i].update("rotate", url.substring(0, url.indexOf(".")) + "-rotated.jpg")
            }
        }
    },
    resize: async (id, width, height) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .resize({
                        width: width,
                        height: height
                    })
                    .toFile(url.substring(0, url.indexOf(".")) + "-resized.jpg");

                imageObjectsArray[i].lastChange = "resize"
                imageObjectsArray[i].update("resize", url.substring(0, url.indexOf(".")) + "-resized.jpg")
            }
        }
    },
    reformat: async (id, format) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .toFormat(format)
                    .toFile(url.substring(0, url.indexOf(".")) + "-reformatted." + format);

                imageObjectsArray[i].lastChange = "reformat"
                imageObjectsArray[i].update("reformat", url.substring(0, url.indexOf(".")) + "-reformatted." + format)
            }
        }
    },
    crop: async (id, width, height, left, top) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .extract({ width: width, height: height, left: left, top: top })
                    .toFile(url.substring(0, url.indexOf(".")) + "-cropped.jpg");

                imageObjectsArray[i].lastChange = "crop"
                imageObjectsArray[i].update("crop", url.substring(0, url.indexOf(".")) + "-cropped.jpg")
            }
        }
    },
    grayscale: async (id) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .grayscale()
                    .toFile(url.substring(0, url.indexOf(".")) + "-grayscaled.jpg");

                imageObjectsArray[i].lastChange = "grayscale"
                imageObjectsArray[i].update("grayscale", url.substring(0, url.indexOf(".")) + "-grayscaled.jpg")
            }
        }
    },
    flip: async (id) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .flip()
                    .toFile(url.substring(0, url.indexOf(".")) + "-flipped.jpg");

                imageObjectsArray[i].lastChange = "flip"
                imageObjectsArray[i].update("flip", url.substring(0, url.indexOf(".")) + "-flipped.jpg")
            }
        }
    },
    flop: async (id) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .flop()
                    .toFile(url.substring(0, url.indexOf(".")) + "-flopped.jpg");

                imageObjectsArray[i].lastChange = "flop"
                imageObjectsArray[i].update("flop", url.substring(0, url.indexOf(".")) + "-flopped.jpg")
            }
        }
    },
    negate: async (id) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .negate()
                    .toFile(url.substring(0, url.indexOf(".")) + "-negated.jpg");

                imageObjectsArray[i].lastChange = "negate"
                imageObjectsArray[i].update("negate", url.substring(0, url.indexOf(".")) + "-negated.jpg")
            }
        }
    },
    tint: async (id, r, g, b) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                let url

                if (imageObjectsArray[i].history.length > 1) {
                    url = imageObjectsArray[i].history[imageObjectsArray[i].history.length - 1].url
                } else {
                    url = imageObjectsArray[i].url
                }

                await sharp(url)
                    .tint({r:r,g:g,b:b})
                    .toFile(url.substring(0, url.indexOf(".")) + "-tinted.jpg");

                imageObjectsArray[i].lastChange = "tint"
                imageObjectsArray[i].update("tint", url.substring(0, url.indexOf(".")) + "-tinted.jpg")
            }
        }
    },

}