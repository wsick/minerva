var path = require('path'),
    connect_livereload = require('connect-livereload'),
    gunify = require('grunt-fayde-unify');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks("grunt-version-ts");
    var unify = gunify(grunt);

    var ports = {
        stress: 9001,
        livereload: 19001
    };
    var meta = {
        name: 'minerva'
    };

    var dirs = {
        test: {
            root: 'test',
            build: 'test/.build',
            lib: 'test/lib'
        },
        stress: {
            root: 'stress',
            build: 'stress/.build',
            lib: 'stress/lib'
        }
    };

    function mount(connect, dir) {
        return connect.static(path.resolve(dir));
    }

    grunt.initConfig({
        ports: ports,
        meta: meta,
        dirs: dirs,
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            bower: ['./lib'],
            test: [dirs.test.build, dirs.test.lib],
            stress: [dirs.stress.build, dirs.stress.lib]
        },
        "bower-install-simple": {
            lib: {
                directory: "lib"
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    {
                        expand: true,
                        src: ['themes/', 'dist/', 'src/'],
                        dest: '<%= dirs.test.lib %>/<%= meta.name %>'
                    },
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: ['*'],
                        dest: dirs.test.lib,
                        filter: 'isDirectory'
                    }
                ]
            },
            stress: {
                files: [
                    {
                        expand: true,
                        src: ['dist/', 'src/'],
                        dest: '<%= dirs.stress.lib %>/<%= meta.name %>'
                    },
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: ['*', '!qunit'],
                        dest: dirs.stress.lib,
                        filter: 'isDirectory'
                    }
                ]
            }
        },
        typescript: {
            build: {
                src: [
                    'typings/**/*.d.ts',
                    'lib/perfex/dist/perfex.d.ts',
                    'src/_Version.ts',
                    'src/*.ts',
                    'src/pipe/*.ts',
                    'src/core/*.ts',
                    'src/core/**/*.ts',
                    'src/**/*.ts'
                ].concat(unify.typings({includeSelf: false})),
                dest: './dist/<%= meta.name %>.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: [
                    'typings/**/*.d.ts',
                    'lib/perfex/dist/perfex.d.ts',
                    '<%= dirs.test.root %>/**/*.ts',
                    '!<%= dirs.test.lib %>/**/*.ts'
                ].concat(unify.typings()),
                dest: dirs.test.build,
                options: {
                    target: 'es5',
                    basePath: dirs.test.root,
                    module: 'amd',
                    sourceMap: true
                }
            },
            stress: {
                src: [
                    'typings/*.d.ts',
                    'lib/perfex/dist/perfex.d.ts',
                    '<%= dirs.stress.root %>/**/*.ts',
                    '!<%= dirs.stress.lib %>/**/*.ts'
                ].concat(unify.typings()),
                dest: dirs.stress.build,
                options: {
                    target: 'es5',
                    basePath: dirs.stress.root,
                    module: 'amd',
                    sourceMap: true
                }
            }
        },
        qunit: {
            all: ['<%= dirs.test.root %>/*.html']
        },
        connect: {
            stress: {
                options: {
                    port: ports.stress,
                    base: dirs.stress.root,
                    middleware: function (connect) {
                        return [
                            connect_livereload({ port: ports.livereload }),
                            mount(connect, dirs.stress.build),
                            mount(connect, dirs.stress.root)
                        ];
                    }
                }
            }
        },
        watch: {
            src: {
                files: [
                    'src/*.ts',
                    'src/**/*.ts'
                ],
                tasks: ['typescript:build']
            },
            stressts: {
                files: [
                    '<%= dirs.stress.root %>/*.ts',
                    '<%= dirs.stress.root %>/**/*.ts',
                    '!<%= dirs.stress.lib %>/**/*.ts'
                ],
                tasks: ['typescript:stress']
            },
            stressjs: {
                files: [
                    '<%= dirs.stress.root %>/tests.json',
                    '<%= dirs.stress.root %>/index.html',
                    '<%= dirs.stress.build %>/**/*.js',
                    'dist/minerva.js'
                ],
                options: {
                    livereload: ports.livereload
                }
            }
        },
        open: {
            stress: {
                path: 'http://localhost:<%= ports.stress %>/index.html'
            }
        },
        "version-apply": {
            options: {
                label: 'version'
            }
        },
        uglify: {
            options: {
                sourceMap: function (path) {
                    return path.replace(/(.*).min.js/, "$1.js.map");
                },
                sourceMapIn: 'dist/<%= meta.name %>.js.map',
                sourceMapIncludeSources: true
            },
            dist: {
                src: ['dist/<%= meta.name %>.js'],
                dest: 'dist/<%= meta.name %>.min.js'
            }
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['typescript:build', 'typescript:test', 'qunit']);
    grunt.registerTask('stress', ['typescript:build', 'typescript:stress', 'connect', 'open', 'watch']);
    grunt.registerTask('lib:reset', ['clean', 'bower-install-simple', 'symlink:test', 'symlink:stress']);
    grunt.registerTask('dist:upbuild', ['bump-build', 'version-apply', 'typescript:build', 'uglify:dist']);
    grunt.registerTask('dist:upminor', ['bump-minor', 'version-apply', 'typescript:build', 'uglify:dist']);
    grunt.registerTask('dist:upmajor', ['bump-major', 'version-apply', 'typescript:build', 'uglify:dist']);
    grunt.registerTask('dist:nobump', ['version-apply', 'typescript:build', 'uglify:dist']);
};