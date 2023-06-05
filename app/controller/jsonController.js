const { imageObject, imageObjectsArray } = require("../model");

module.exports = {
    add: (album, originalName, url) => {
        let image = new imageObject(album, originalName, url)
        imageObjectsArray.push(image)
    },
    delete: (id) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                imageObjectsArray.splice(i, 1);
            }
        }
    },
    update: (body) => {
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == body.id) {
                imageObjectsArray[i].update(body.status)
            }
        }
    },
    getall: () => {
        return imageObjectsArray;
    },
    get: (id) => {
        let founded = false
        for (var i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                founded = true
                return imageObjectsArray[i]
            }
        }
        if (!founded) {
            return 404
        }
    },
    getAlbum: (album) => {
        let albumArray = []

        for(let i = 0; i < imageObjectsArray.length; i++){
            if(imageObjectsArray[i].album == album){
                albumArray.push(imageObjectsArray[i])
            }
        }

        if(albumArray.length > 0){ 
            return albumArray
        }else{
            return 404
        }
    }
}