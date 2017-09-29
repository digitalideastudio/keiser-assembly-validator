// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'Testing initial model scanner state': function test(browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.el-input input')
            .assert.attributeEquals('.el-input input', 'icon', 'fa-barcode')
            .assert.attributeEquals('.el-input input', 'placeholder', 'Product model')
            .assert.cssClassNotPresent('.el-input input', 'valid')
            .assert.cssClassNotPresent('.el-input input', 'invalid')
            // .assert.elementCount('img', 1)
            .end();
    },
    'Scanning teset': function test(browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.el-input input')
            .setValue('.el-input input', '$$$$@INVALID@$$$$')
            .click('el-input__icon.el-icon-fa-barcodeinput')
            .assert.cssClassNotPresent('.el-input input', 'valid')
            .assert.cssClassPresent('.el-input input', 'invalid')
            // .assert.elementCount('img', 1)
            .end();
    },
};
