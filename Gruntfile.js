var version = require('./build/version'),
    setup = require('./build/setup');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    var meta = {
        name: 'minerva'
    };

    grunt.initConfig({
        meta: meta,
        setup: {
            test: {
                cwd: './test'
            }
        },
        typescript: {
            build: {
                src: ['src/_Version.ts', 'src/*.ts', 'src/**/*.ts'],
                dest: '<%= meta.name %>.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: ['test/**/*.ts', '!test/lib/**/*.ts'],
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true
                }
            }
        },
        copy: {
            pretest: {
                files: [
                    { expand: true, flatten: true, src: ['<%= meta.name %>.js'], dest: 'test/lib/<%= meta.name %>', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['<%= meta.name %>.d.ts'], dest: 'test/lib/<%= meta.name %>', filter: 'isFile' }
                ]
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

    grunt.registerTask('default', ['version:apply', 'typescript:build']);
    grunt.registerTask('test', ['setup:test', 'version:apply', 'typescript:build', 'copy:pretest', 'typescript:test', 'qunit']);
    setup(grunt);
    version(grunt);
};