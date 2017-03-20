var Launcher = require('webdriverio').Launcher;
// var wdio = new Launcher(opts.configFile, opts);
// wdio.run().then(function (code) {
//     process.exit(code);
// }, function (error) {
//     console.error('Launcher failed to start the test', error.stacktrace);
//     process.exit(1);
// });

describe('DuckDuckGo search', function() {
    it('searches for WebdriverIO', function() {
        browser.url('https://duckduckgo.com/');
        browser.setValue('#search_form_input_homepage', 'WebdriverIO');
        browser.click('#search_button_homepage');
        var title = browser.getTitle();
        console.log('Title is: ' + title);
        // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
    });
});
