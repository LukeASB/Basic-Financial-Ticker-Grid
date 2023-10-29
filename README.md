# Basic-Financial-Ticker-Grid-UI
UI Only - Basic Financial Ticker Grid that uses CSV data for a Frontend Tech Test.

Available for anyone to use and build on.

# What's Is
Basic Financial Ticker Grid that loads and uses CSV Data: /public/data/snapshot.csv, /public/data/deltas.csv.

/public/data/snapshot.csv is the data that's loaded and parsed into the initial view.

/public/data/deltas.csv is the data that is iterated through to update the "Price", "Change" and "Change %" - if the value is greater the number turns green, if the value is less than the number turns red. 

When only a number exists on a line, that amount of time in miliseconds is waited until processing the next set of deltas.

When the final set of deltas is processed, the application returns to the start of the file and repeats. This is done until the application is terminated.

# Tech Stack
- TypeScript/JavaScript
- CSS
- HTML 

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