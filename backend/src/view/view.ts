export default class View {

    /**
     * Splits the deltas into a 2D Array of strings
     * @param deltas 
     * @returns {object}
     */
    public getDeltas(deltas: string): object {
        let lines: string[][] = [[""]];
        try {
            lines = deltas.split(`\n`).map(line => line.split(','));
        } catch (ex) {
            console.log(`view.getDeltas 💣 ex= ${ex}`);
        } finally {
            return { lines: lines }
        }
    }

    /**
     * Destructs the snapshot data into headers and stocks
     * @param snapshotCsvData 
     * @returns {object} { headers: table headers, stocks: ["stocks array"]}
     */
    public getSnapshot(snapshotCsvData: string): object {
        if (snapshotCsvData.length <= 0) return { headers: "", stocks: [""] };
        const [headers, ...stocks] = snapshotCsvData.split(`\n`);
        return { headers: headers, stocks: stocks };
    }
}