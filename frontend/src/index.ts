import { FinancialTrackerGridView } from './financial-tracker-grid-view.js';

class Index {
    constructor() {
        this.main();
    }
    public main() {
        window.onload = () => {
            (async () => {
                const financialTrackerGridView = new FinancialTrackerGridView();
                await financialTrackerGridView.makeGrid();
            })();
        }
    }
}

const index = new Index();
index.main();