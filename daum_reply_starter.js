var Launcher = require('webdriverio').Launcher;
var wdio = new Launcher('/dev/reply/node_modules/.bin/wdio.conf_daum.js');



wdio.run().then(function (code) {
    process.exit(code);
}, function (error) {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});
