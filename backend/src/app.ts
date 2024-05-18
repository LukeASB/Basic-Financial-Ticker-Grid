const config = require("config");
const express = require("express");

const app = express();
const appName = config.get("name");
const port = config.get("port");
const { appRoutes } = require("./routes/routes");

const router = express.Router();
appRoutes(appName, router)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(router);




app.listen(port, err => {
    if (err) return console.log(`Can't listen on port: ${port}`);
    console.log(`Executing ${appName}. Server is listening on: http://localhost:${port}`);
})