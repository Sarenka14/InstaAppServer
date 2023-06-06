const http = require('http');
const imageRouter = require("./app/router/imageRouter")
const tagsRouter = require("./app/router/tagsRouter")
const filtersRouter = require("./app/router/filtersRouter")
const usersRouter = require("./app/router/usersRouter")
require('dotenv').config();
const bcrypt = require('bcryptjs');

http.createServer(async (req, res) => {
    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }
    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }
    else if (req.url.search("/api/filters") != -1) {
        await filtersRouter(req, res)
    }
    else if (req.url.search("/api/user") != -1) {
        await usersRouter(req, res)
     }
})
    .listen(process.env.APP_PORT, () => console.log(`listen on ${process.env.APP_PORT}`))