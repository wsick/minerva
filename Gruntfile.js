var version = require('./build/version'),
    setup = require('./build/setup');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
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
                src: ['src/_Version.ts', 'src/*.ts', 'src/pipe/*.ts', 'src/core/*.ts', 'src/core/**/*.ts', 'src/**/*.ts'],
                dest: '<%= meta.name %>.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: ['test/**/*.ts', '!test/lib/**/*.ts'],
                dest: 'test/.build',
                options: {
                    target: 'es5',
                    basePath: 'test/tests',
                    sourceMap: true
                }
            }
        },
        clean: {
            build: ["<%= meta.name %>.*"],
            test: ["test/.build", "test/lib/<%= meta.name %>"]
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
    grunt.registerTask('dist:upbuild', ['version:bump:build', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upminor', ['version:bump:minor', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upmajor', ['version:bump:major', 'version:apply', 'typescript:build']);
};