const getRequestData = require("../getRequestData");
const filtersController = require("../controller/filtersController");

const filtersRouter = async (req, res) => {
    if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method == "GET") {
        let data = await filtersController.getMetadata(/[^/]*$/.exec(req.url)[0])

        if (data != 404) {
            res.end(JSON.stringify(data, null, 5));
            res.statusCode = 200;
            res.statusMessage = 'OK';
        } else {
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
        }
    } else if (req.url == "/api/filters" && req.method == "PATCH") {
        let body = JSON.parse(await getRequestData(req));
        if(body.action == "rotate"){
            filtersController.rotate(body.id)
        } else if (body.action == "resize"){
            filtersController.resize(body.id, body.width, body.height)
        } else if (body.action == "reformat"){
            filtersController.reformat(body.id, body.format)
        } else if (body.action == "crop"){
            filtersController.crop(body.id, body.width, body.height, body.left, body.top)
        } else if (body.action == "grayscale"){
            filtersController.grayscale(body.id)
        } else if (body.action == "flip"){
            filtersController.flip(body.id)
        } else if (body.action == "flop"){
            filtersController.flop(body.id)
        } else if (body.action == "negate"){
            filtersController.negate(body.id)
        } else if (body.action == "tint"){
            filtersController.tint(body.id, body.r, body.g, body.b)
        }
    }
}

module.exports = filtersRouter;