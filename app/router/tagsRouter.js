const getRequestData = require("../getRequestData");
const tagsController = require("../controller/tagsController");

const tagsRouter = async (req, res) => {
    if (req.url == "/api/tags/raw" && req.method == "GET") {
        res.end(JSON.stringify(tagsController.getAllRaw(), null, 5));
        res.statusCode = 200;
        res.statusMessage = 'OK';
    } else if (req.url == "/api/tags" && req.method == "GET") {
        res.end(JSON.stringify(tagsController.getAllObjects(), null, 5));
        res.statusCode = 200;
        res.statusMessage = 'OK';
    } else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
        let data = tagsController.get(/[^/]*$/.exec(req.url)[0])

        if (data != 404) {
            res.end(JSON.stringify(data, null, 5));
            res.statusCode = 200;
            res.statusMessage = 'OK';
        } else {
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
        }
    } else if (req.method == "POST") {
        let body = JSON.parse(await getRequestData(req))
        tagsController.add(body.name);
        res.statusCode = 201;
        res.statusMessage = 'Created';
    }
};

module.exports = tagsRouter;