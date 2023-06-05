class imageObject {
    constructor(album, originalName, url) {
        this.id = Date.now();
        this.album = album;
        this.originalName = originalName;
        this.url = url;
        this.lastChange = "original"
        this.history = [{
            status: "original",
            timestamp: new Date().toISOString()
        }]
        this.tags = []
    }

    update(status) {
        this.history.push({ status: status, timestamp: new Date().toISOString() })
    }

    update(status, url) {
        this.history.push({ status: status, timestamp: new Date().toISOString(), url: url })
    }

    addTag(name) {
        this.tags.push({ name: name })
    }
}

let imageObjectsArray = []

class tagObject {
    constructor(name) {
        try {
            this.id = tagObjectsArray[tagObjectsArray.length - 1].id + 1;
        } catch (error) {
            this.id = 0
        }
        this.name = name;
        this.popularity = Math.floor(Math.random() * 1000) + 1;
    }
}

let tagObjectsArray = []

module.exports = { imageObject, imageObjectsArray, tagObject, tagObjectsArray };