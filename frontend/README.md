![Basic Financial Ticker Grid UI Screenshot](https://raw.githubusercontent.com/LukeASB/Basic-Financial-Ticker-Grid-UI/main/BasicFinanicalTickerGridUI_Screenshot.png)

Found this useful?
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/lukesb)

# Basic-Financial-Ticker-Grid
Basic Financial Ticker Grid that uses CSV data for a Frontend Tech Test.

Available for anyone to use and build on.

# What's Is
Basic Financial Ticker Grid that loads and uses CSV Data: /public/data/snapshot.csv, /public/data/deltas.csv.

# Workflow
- Index.main()
- FinancialTrackerGridView.makeGrid() - Create the table elements for header/body, and add relevant data.
- FinancialTrackerGridView.getData() - Get the Snapshot and Delta CSV files and render them.
- updateGrid() - Update the grid data elements.
- updateDataLoop() - Loops until page is closed.

# How To Start
- npm install
- npm start
- Go to http://localhost:{port}, e.g http://localhost:3000 (The default port in the config/default.json is 3000)
