const Jasmine = require('jasmine');

var jasmine = new Jasmine()
jasmine.loadConfig({
    spec_files: [
        '../**/*.spec.js',
    ],
});
jasmine.execute()
