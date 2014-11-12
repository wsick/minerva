var version = require('./build/version'),
    setup = require('./build/setup'),
    path = require('path'),
    connect_livereload = require('connect-livereload');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');

    var meta = {
        name: 'minerva'
    };
    var ports = {
        stress: 9001,
        livereload: 19001
    };
    var dirs = {
        stress: {
            build: './stress/.build',
            root: './stress'
        }
    };

    function mount(connect, dir) {
        return connect.static(path.resolve(dir));
    }

    grunt.initConfig({
        meta: meta,
        ports: ports,
        dirs: dirs,
        clean: {
            test: ['test/.build', 'test/lib'],
            stress: ['stress/.build', 'stress/lib']
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
                    {src: './lib/qunit', dest: './test/lib/qunit'},
                    {src: './minerva.js', dest: './test/lib/minerva/minerva.js'},
                    {src: './minerva.d.ts', dest: './test/lib/minerva/minerva.d.ts'},
                    {src: './minerva.js.map', dest: './test/lib/minerva/minerva.js.map'},
                    {src: './src', dest: './test/lib/minerva/src'}
                ]
            },
            stress: {
                files: [
                    {src: './lib/requirejs', dest: './stress/lib/requirejs'},
                    {src: './lib/requirejs-text', dest: './stress/lib/requirejs-text'},
                    {src: './minerva.js', dest: './stress/lib/minerva/minerva.js'},
                    {src: './minerva.d.ts', dest: './stress/lib/minerva/minerva.d.ts'},
                    {src: './minerva.js.map', dest: './stress/lib/minerva/minerva.js.map'},
                    {src: './src', dest: './stress/lib/minerva/src'}
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
                src: [
                    'minerva.d.ts',
                    'stress/**/*.ts',
                    '!stress/lib/**/*.ts',
                    'typings/*.d.ts'
                ],
                dest: 'stress/.build',
                options: {
                    target: 'es5',
                    basePath: 'stress',
                    module: 'amd',
                    sourceMap: true
                }
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        connect: {
            stress: {
                options: {
                    port: ports.stress,
                    base: dirs.stress.root,
                    middleware: function (connect) {
                        return [
                            connect_livereload({port: ports.livereload}),
                            mount(connect, dirs.stress.build),
                            mount(connect, dirs.stress.root)
                        ];
                    }
                }
            }
        },
        open: {
            stress: {
                path: 'http://localhost:<%= ports.stress %>/index.html'
            }
        },
        watch: {
            stressts: {
                files: [
                    '<%= dirs.stress.root %>/*.ts',
                    '<%= dirs.stress.root %>/**/*.ts',
                    '!<%= dirs.stress.root %>/lib/**/*.ts'
                ],
                tasks: ['typescript:stress']
            },
            stress: {
                files: [
                    '<%= dirs.stress.root %>/tests.json',
                    '<%= dirs.stress.build %>/**/*.js'
                ],
                options: {
                    livereload: ports.livereload
                }
            }
        },
        version: {
            bump: {},
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['typescript:build', 'typescript:test', 'qunit']);
    grunt.registerTask('stress', ['typescript:build', 'typescript:stress', 'connect', 'open', 'watch']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('lib:reset', ['clean', 'setup', 'symlink:test', 'symlink:stress']);
    grunt.registerTask('dist:upbuild', ['version:bump:build', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upminor', ['version:bump:minor', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upmajor', ['version:bump:major', 'version:apply', 'typescript:build']);
};