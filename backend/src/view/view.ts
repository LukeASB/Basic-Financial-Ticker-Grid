exports.getDeltas = (deltas) => {
    const lines = deltas.split(`\n`).map(line => line.split(','));
    return { lines: lines }
}

exports.getSnapshot = (snapshotCsvData) => {
    const [headers, ...stocks] = snapshotCsvData.split(`\n`);
    return { headers: headers, stocks: stocks };
}