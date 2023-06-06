const usersController = require("../controller/usersController");

const usersRouter = async (req, res) => {
    if (req.url == "/api/user/register" && req.method == "POST") {
        let body = JSON.parse(await getRequestData(req))
        res.statusCode = 201;
        res.statusMessage = 'Created';
        res.end(await usersController.register(body.name, body.lastName, body.email, body.password))
    } else if (req.url.match(/\/api\/user\/([A-Za-z0-9]+)/) && req.method == "GET") {
        usersController.confirmUser(/[^/]*$/.exec(req.url)[0]), null, 5;
        res.statusCode = 200;
        res.statusMessage = 'OK';
    } else if (req.url == "/api/user/login" && req.method == "POST") {
        let body = JSON.parse(await getRequestData(req))
        res.statusCode = 201;
        res.statusMessage = 'Created';
        res.end(await usersController.logIn(body.email, body.password))
    } else if (req.url == "/api/user" && req.method == "GET") {
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.end(JSON.stringify(usersController.get(), null, 5));
    }
}

module.exports = usersRouter;