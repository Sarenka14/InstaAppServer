const getRequestData = require("../getRequestData");
const fileController = require("../controller/fileController");
const jsonController = require("../controller/jsonController");
const tagsController = require("../controller/tagsController");
const fs = require("fs");

const imageRouter = async (req, res) => {
    if (req.url == "/api/photos" && req.method == "GET") {
        res.end(JSON.stringify(jsonController.getall(), null, 5));
        res.statusCode = 200;
        res.statusMessage = 'OK';
    } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
        let data = jsonController.get(/[^/]*$/.exec(req.url)[0])

        if (data != 404) {
            res.end(JSON.stringify(data, null, 5));
            res.statusCode = 200;
            res.statusMessage = 'OK';
        } else {
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
        }
    } else if (req.method == "POST") {
        fileController.add(req);
        res.statusCode = 201;
        res.statusMessage = 'Created';
    } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
        jsonController.delete(/[^/]*$/.exec(req.url)[0]);
    } else if (req.url == "/api/photos" && req.method == "PATCH") {
        let body = JSON.parse(await getRequestData(req));
        jsonController.update(body);
    }

    //-------------------------------------------------------------------------------

    else if (req.url == "/api/photos/tags" && req.method == "PATCH") {
        let body = JSON.parse(await getRequestData(req));
        tagsController.updateNewTag(body);
    } else if (req.url == "/api/photos/tags/mass" && req.method == "PATCH") {
        let body = JSON.parse(await getRequestData(req));
        for (let i = 0; i < body.length; i++) {
            tagsController.updateNewTag(body[i]);
        }
    } else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "GET") {
        res.end(JSON.stringify(tagsController.getPhotoTags(/[^/]*$/.exec(req.url)[0]), null, 5));
        res.statusCode = 200;
        res.statusMessage = 'OK';
    }

    //-------------------------------------------------------------------------------
    else if (req.url.match(/\/api\/photos\/getfile\/([0-9]+)\/([A-Za-z0-9]+)/) && req.method == "GET") {
        let url = await fileController.getEdited(req.url.replace(/[^0-9]/g, ""), /[^/]*$/.exec(req.url)[0])

        fs.readFile(
            url,
            function (error, data) {
                if (/[^/]*$/.exec(url)[0] == "jpg") {
                    res.writeHead(200, { "Content-Type": "image/jpeg" });
                } else {
                    res.writeHead(200, { "Content-Type": "image/png" });
                }
                res.write(data);
                res.end();
            }
        )
    } else if (req.url.match(/\/api\/photos\/getfile\/([0-9]+)/) && req.method == "GET") {
        fs.readFile(
            await fileController.get(/[^/]*$/.exec(req.url)[0]),
            function (error, data) {
                res.writeHead(200, { "Content-Type": "image/jpeg" });
                res.write(data);
                res.end();
            }
        )
    } else if (req.url.match(/\/api\/photos\/([A-Za-z0-9]+)/) && req.method == "GET") {
        let data = jsonController.getAlbum(/[^/]*$/.exec(req.url)[0])

        if (data != 404) {
            res.end(JSON.stringify(data, null, 5));
            res.statusCode = 200;
            res.statusMessage = 'OK';
        } else {
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
        }
    }


};

module.exports = imageRouter;
