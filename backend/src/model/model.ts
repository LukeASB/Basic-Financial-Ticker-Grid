const fs = require('fs').promises;

const snapshotFile = "./src/csv/snapshot.csv";
const deltasFile = "./src/csv/deltas.csv";

exports.getDeltas = async () => {
    const data = await getFile(deltasFile);
    return data;
}

exports.getSnapshot = async () => {
    const data = await getFile(snapshotFile);
    return data;
}

const getFile = async (file = "") => {
    try {
        const data = await fs.readFile(file, 'utf8');
        return data;
    } catch (ex) {
        console.log(`model.getFile 💣 ex= ${ex}`);
        return [];
    }
}