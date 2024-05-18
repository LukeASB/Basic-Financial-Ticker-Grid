![Basic Financial Ticker Grid UI Screenshot](https://raw.githubusercontent.com/LukeASB/Basic-Financial-Ticker-Grid-UI/main/BasicFinanicalTickerGridUI_Screenshot.png)

Found this useful?
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/lukesb)

# Basic-Financial-Ticker-Grid
Frontend - Basic Financial Ticker Grid that uses data to generate basic financial ticker grid.
Backend - NodeJS backend that supplies the snapshot and deltas data for the finanical ticker grid.

Available for anyone to use and build on.

/public/data/snapshot.csv is the data that's loaded and parsed into the initial view.

/public/data/deltas.csv is the data that is iterated through to update the "Price", "Change" and "Change %" - if the value is greater the number turns green, if the value is less than the number turns red. 

When only a number exists on a line, that amount of time in miliseconds is waited until processing the next set of deltas.

When the final set of deltas is processed, the application returns to the start of the file and repeats. This is done until the application is terminated.

# Tech Stack
- TypeScript/JavaScript/NodeJS
- CSS
- HTML 