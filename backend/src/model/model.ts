import { readFile } from "fs/promises";

export default class Model {
    constructor(public snapshotFile: string, public deltasFile: string) {
        this.snapshotFile = snapshotFile;
        this.deltasFile = deltasFile;
    }

    /**
     * Gets the Deltas (data that is iterated through to update the "Price", "Change" and "Change %" - if the value is greater the number turns green, if the value is less than the number turns red.)
     * @returns {Promise<string>} delta file text
     */
    public async getDeltas(): Promise<string> {
        const data = await this.getFile(this.deltasFile);
        return data;
    }
    
    /**
     * Gets the Snapshot (data that's loaded and parsed into the initial view.)
     * @returns {Promise<string>} snapshot file text
     */
    public async getSnapshot(): Promise<string> {
        const data = await this.getFile(this.snapshotFile);
        return data;
    }

    /**
     * Reads the csv file.
     * 
     * @param {string} file
     * @returns {Promise<string>} csv file content or empty string
     */
    private async getFile(file = ""): Promise<string> {
        try {
            const data = await readFile(file, 'utf8');
            return data;
        } catch (ex) {
            console.log(`model.getFile 💣 ex= ${ex}`);
            return "";
        }
    }
}