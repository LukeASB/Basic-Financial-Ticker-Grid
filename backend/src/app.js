const config = require("config");
const express = require("express");

const app = express();
const name = config.get("name");
const port = config.get("port");
const { appRoutes } = require("./routes/routes");

const router = express.Router();
appRoutes(router)
app.use(router);


app.listen(port, err => {
    if (err) return console.log(`Can't listen on port: ${port}`);
    console.log(`Executing ${name}. Server is listening on: http://localhost:${port}`);
})