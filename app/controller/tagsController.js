const { tagObject, tagObjectsArray, imageObjectsArray } = require("../model");
const tagsStringArray = ['#love',
    '#instagood',
    '#fashion',
    '#photooftheday',
    '#art',
    '#photography',
    '#instagram',
    '#beautiful',
    '#picoftheday',
    '#nature',
    '#happy',
    '#cute',
    '#travel',
    '#style',
    '#followme',
    '#tbt',
    '#instadaily',
    '#repost',
    '#like4like',
    '#summer',
    '#beauty',
    '#fitness',
    '#food',
    '#selfie',
    '#me',
    '#instalike',
    '#girl',
    '#friends',
    '#fun',
    '#photo']

for (let i = 0; i < tagsStringArray.length; i++) {
    let tag = new tagObject(tagsStringArray[i])
    tagObjectsArray.push(tag)
}

module.exports = {
    getAllRaw: () => {
        return tagsStringArray;
    },
    getAllObjects: () => {
        return tagObjectsArray;
    },
    get: (id) => {
        let founded = false

        for (let i = 0; i < tagObjectsArray.length; i++) {
            if (tagObjectsArray[i].id == id) {
                founded = true
                return tagObjectsArray[i]
            }
        }

        if (!founded) {
            return 404
        }
    },
    add: (name) => {
        let existsTag = false

        for (let i = 0; i < tagsStringArray.length; i++) {
            if (tagsStringArray[i] == name) {
                existsTag = true
            }
        }

        if (!existsTag) {
            let tag = new tagObject(name)
            tagObjectsArray.push(tag)
            tagsStringArray.push(name)
        }
    },
    updateNewTag: (body) => {
        let existsTag = false

        for (let i = 0; i < tagsStringArray.length; i++) {
            if (tagsStringArray[i] == body.name) {
                existsTag = true
            }
        }

        if (!existsTag) {
            let tag = new tagObject(body.name)
            tagObjectsArray.push(tag)
            tagsStringArray.push(body.name)
        }

        for (let i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == body.id) {
                let existsInPhoto = false

                for (let j = 0; j < imageObjectsArray[i].tags.length; j++) {
                    if (imageObjectsArray[i].tags.length != 0 && imageObjectsArray[i].tags[j].name == body.name) {
                        existsInPhoto = true
                    }
                }

                if (!existsInPhoto) {
                    imageObjectsArray[i].addTag(body.name)
                }
            }
        }
    },
    getPhotoTags: (id) => {
        let founded = false

        for (let i = 0; i < imageObjectsArray.length; i++) {
            if (imageObjectsArray[i].id == id) {
                founded = true

                let returnObject = {
                    id: id,
                    tags: imageObjectsArray[i].tags
                }

                return returnObject
            }
        }

        if (!founded) {
            return 404
        }
    }
}
