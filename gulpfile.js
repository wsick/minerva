var fs = require('fs'),
    meta = {
        name: 'minerva',
        buildfiles: [
            'typings/**/*.d.ts',
            'lib/perfex/dist/perfex.d.ts',
            'src/_Version.ts',
            'src/*.ts',
            'src/**/*.ts'
        ]
    };

fs.readdirSync('./gulp')
    .forEach(function (file) {
        require('./gulp/' + file)(meta);
    });