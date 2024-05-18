const controller = require("../controller/controller")

exports.appRoutes = (appName = "", router) => {
    router.get("/", (req, res, next) => res.json({ appName: `${appName}`, endpoints: `/getDeltas, /getSnapshot`}));
    router.get("/getDeltas", controller.getDeltas);
    router.get("/getSnapshot", controller.getSnapshot);
}