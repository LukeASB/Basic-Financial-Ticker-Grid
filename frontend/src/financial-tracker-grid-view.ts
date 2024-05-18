import { GridData } from "./grid-data.js";
import { IGridData } from "./IGridData";
import { ITracker } from "./ITracker.js";

export class FinancialTrackerGridView {
    private companies: string[] = [];
    private deltas: number[] = [];
    private headers: string[] = [];
    private tableData: IGridData[] = [];
    private snapshotFile: string = "./csv/snapshot.csv";
    private deltasFile: string = "./csv/deltas.csv";
    private tracker: ITracker[] = []; // Make this into an actual type
    private positiveCSSClass: string = "grid__item--positive"
    private negativeCSSClass: string = "grid__item--negative";

    constructor() {}

    /**
     * Create the table elements for header/body, and add relevant data.
     * @returns void
     */
    public async makeGrid() {
        await this.getData();
        const createHeader = () => {
            const headerRow = document.createElement('tr');
            headerRow.classList.add('grid__header');

            this.headers.forEach(el => {
                const th = document.createElement('th');
                th.textContent = el;
                headerRow.appendChild(th);
            })
        
            table.appendChild(headerRow);
        }

        const createBody = () => {
            this.tableData.forEach(el => {
                const name = el.name;
                const row = document.createElement('tr');
                row.classList.add(`grid__item`);
                row.setAttribute('id', el.name);
            
                const rowData = [el.name, el.companyName, `${el.price}`, `${el.change}`, el.chgPercent, el.mktCap];
                this.tracker.push({name: el.name, price: el.price, change: el.change, chgPercent: el.chgPercent})
                rowData.forEach((el, i) => {
                    const td = document.createElement('td');
                    td.textContent = el;
                    td.className = `grid__item ${name}-${i}`;
                    row.appendChild(td);
                })
            
                table.appendChild(row);
            })
        }

        const gridContainer = document.getElementById('grid');
        const table = document.createElement('table');
        table.classList.add('grid');
        createHeader();
        createBody();
        gridContainer?.appendChild(table);
    }

    /**
     * Update the grid data elements.
     * @param {IGridData} update
     * @returns {void}
     */
    private async updateGrid(update: IGridData) {
        if (update.price === 0) return;
        const priceItemId = 2;
        const changeItemId = 3;
        const chgPercentId = 4;

        const currentRow: HTMLElement = document.getElementById(update.name)!;
        const updatedRow: HTMLElement = currentRow;
        const items: Element[] = [];

        const findTrackerItem = this.tracker.find(el => el.name === update.name);

        const updateRowItem = (row: string, update: string, trackerItem: string) => {
            let isChgPercent = false;
            const handleChgPercent = ((item: string) => {
                isChgPercent = true;
                return item.split('%')[0];
            });

            if (update.includes('%')) update = handleChgPercent(update);
            if (trackerItem.includes('%')) trackerItem = handleChgPercent(trackerItem);

            const item: Element | null = updatedRow.querySelector(row);

            if (Number(update) < Number(trackerItem)) {
                item?.classList.remove(this.positiveCSSClass);
                item?.classList.add(this.negativeCSSClass);
            }
            if (Number(update) > Number(trackerItem)) {
                item?.classList.remove(this.negativeCSSClass);
                item?.classList.add(this.positiveCSSClass);
            }
            if (Number(update) === Number(trackerItem)) {
                item?.classList.remove(this.negativeCSSClass);
                item?.classList.remove(this.positiveCSSClass);
            }
            if (isChgPercent) update = `${update}%`;

            items.push(item!);
            item!.innerHTML = update; 
        }

        if (findTrackerItem) {
            updateRowItem(`.${update.name}-${priceItemId}`, `${update.price}`, `${findTrackerItem.price}`);
            updateRowItem(`.${update.name}-${changeItemId}`, `${update.change}`, `${findTrackerItem.change}`);
            updateRowItem(`.${update.name}-${chgPercentId}`, `${update.chgPercent}`, findTrackerItem.chgPercent);
        }

        this.updateTracker(update);

        currentRow.parentNode!.replaceChild(updatedRow, currentRow);
    }

    /**
     * Update the tracker with the updated values.
     * @param {IGridData} update
     * @return {void}
     */
    private updateTracker(update: IGridData): void {
        for (let i = 0; i < this.tracker.length; i++) {
            if (this.tracker[i].name === update.name) {
                this.tracker[i].price = update.price;
                this.tracker[i].change = update.change;
                this.tracker[i].chgPercent = update.chgPercent;
                break;
            }
        }
    }

    /**
     * Iterate through table data, and call updateGrid() to update the grid.
     * If the deltas has a single element, we need to wait for that about of time to pass
     * before proceeding.
     * Once the table data is complete, recursively calls itself to start the process again.
     * This occurs infinitely until the application is terminated.
     */
    private async updateDataLoop() {
        let [currentCompany, currentDelta] = [0, 0];

        for (const item of this.tableData) {
            this.updateGrid(item);
            currentCompany++;
            if (currentCompany === this.companies.length) {
                currentCompany = 0;
                await this.timeout(this.deltas[currentDelta]);
                currentDelta++;
            }
        }
        this.updateDataLoop();
    }

    /**
     * Get the Snapshot and Delta CSV files and render them.
     * @return {void}
     */
    private async getData() {
        const getSnapshot = async () => {
            const getSnapshot = await fetch("http://localhost:8080/getSnapshot");
            const data = await getSnapshot.json();
            const snapshotCsvData = data.snapshot;
            const headers = snapshotCsvData.headers;
            const stocks = snapshotCsvData.stocks;
            this.headers = headers.split(',');
            this.tableData = stocks.filter((stock: string) => stock !== '').map((stock: string) => {
                const [name, companyName, price, change, chgPercent, mktCap] = stock.split(`,`);
                this.companies.push(name);
                return new GridData({ change: +change, chgPercent, companyName, mktCap,name, price: +price });
            });
        }
        const getDelta = async () => {
            const parseDelta = async (lines: string[]) => {
                const getSingleNumberInDeltaCsv = () => {
                    lines.forEach(el => {
                        if (el[0] === '') return
                        this.deltas.push(Number(el[0]))
                    })
                }

                getSingleNumberInDeltaCsv();

                const updates = lines.filter((line: string) => line.length > 1);
                let [currentCompany, currentDelta] = [0, 1];
                await this.timeout(1500); // Figure out why first set of delta is updating first then delaying... Somewhere here.
                updates.forEach(async update => {
                    const [, , price, change, chgPercent] = update;
                    const gridData = new GridData({ change: +change, chgPercent, companyName: '', mktCap: '', name: this.companies[currentCompany], price: +price });
        
                    this.tableData.push(gridData);
                    this.updateGrid(gridData);
                    currentCompany++;
  
                    if (currentCompany === this.companies.length) {
                        currentCompany = 0;
                        await this.timeout(this.deltas[currentDelta]);
                        currentDelta++;
                    }
                })
                this.updateDataLoop();
            }
            const getDeltas = await fetch("http://localhost:8080/getDeltas");
            const data = await getDeltas.json();
            const deltaData = data.deltas.lines;

            parseDelta(deltaData);
        }
        
        await getSnapshot();
        await getDelta();
    }

    /**
     * Pause exection for a given number of milliseconds.
     * @param {number} ms 
     * @returns Promise
     */
    private timeout = (ms: number): Promise<{}> => new Promise((resolve) => setTimeout(resolve, ms));
}

