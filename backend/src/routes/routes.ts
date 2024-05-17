const controller = require("../controller/controller")

exports.appRoutes = router => {
    router.get("/", (req, res, next) => res.json({ test: "hi"}));
    router.get("/getDeltas", controller.getDeltas);
    router.get("/getSnapshot", controller.getSnapshot);
}