var version = require('./build/version'),
    setup = require('./build/setup');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');

    var meta = {
        name: 'minerva'
    };

    grunt.initConfig({
        meta: meta,
        clean: {
            test: ['test/.build', 'test/lib']
        },
        setup: {
            fayde: {
                cwd: '.'
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    { src: './lib/qunit', dest: './test/lib/qunit' },
                    { src: './minerva.js', dest: './test/lib/minerva/minerva.js' },
                    { src: './minerva.d.ts', dest: './test/lib/minerva/minerva.d.ts' },
                    { src: './minerva.js.map', dest: './test/lib/minerva/minerva.js.map' },
                    { src: './src', dest: './test/lib/minerva/src' }
                ]
            }
        },
        typescript: {
            build: {
                src: [
                    'src/_Version.ts',
                    'src/*.ts',
                    'src/pipe/*.ts',
                    'src/core/*.ts',
                    'src/core/**/*.ts',
                    'src/**/*.ts'
                ],
                dest: '<%= meta.name %>.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: [
                    'minerva.d.ts',
                    'test/**/*.ts',
                    '!test/lib/**/*.ts',
                    'typings/*.d.ts'
                ],
                dest: 'test/.build',
                options: {
                    target: 'es5',
                    basePath: 'test/tests',
                    sourceMap: true
                }
            },
            stress: {
                src: [],
                options: {
                    target: 'es5',
                    sourceMap: true
                }
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        version: {
            bump: {
            },
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['typescript:build', 'typescript:test', 'qunit']);
    grunt.registerTask('stress', ['typescript:build', 'typescript:stress']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('lib:reset', ['clean', 'setup', 'symlink:test']);
    grunt.registerTask('dist:upbuild', ['version:bump:build', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upminor', ['version:bump:minor', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upmajor', ['version:bump:major', 'version:apply', 'typescript:build']);
};