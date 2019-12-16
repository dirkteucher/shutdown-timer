# shutdown-timer

This is a simple example electron project I built in an hour that lets the user shutdown their Windows PC at a specified time.

This has only been tested on windows 10 and I would not expect it to work out the box on Linux or Mac but have left the build scripts in the package.json in case anyone wants to extend this.


## Usage
After installing node run the following command to run the start script in package.json

npm start

## Build

npm run package-win
npm run package-mac
npm run package-linux


## Credits

The bulk of the UI was forked from Eleftheria https://codepen.io/EleftheriaBatsou/pen/ygvvwW/ which I then refactored into a shutdown timer.
Electron - https://electronjs.org/


## License

MIT - Use this for anything you want, no restrictions.