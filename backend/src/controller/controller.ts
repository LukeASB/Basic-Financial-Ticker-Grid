const model = require("../model/model");
const view = require("../view/view");

exports.getDeltas = async (req, res, next) => {
    const deltas = await model.getDeltas();
    if (!deltas.length) return res.json({ error: "No deltas found."});
    const data = view.getDeltas(deltas);
    console.log(data);
    res.json({ deltas: data });
}

exports.getSnapshot = async (req, res, next) => {
    const snapshot = await model.getSnapshot();
    if (!snapshot.length) return res.json({ error: "No snapshot found."});
    const data = view.getSnapshot(snapshot);
    console.log(data);
    res.json({ snapshot: data });
}