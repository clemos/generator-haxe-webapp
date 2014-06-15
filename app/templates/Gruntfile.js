// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        public : 'public'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },<% if (includeCompass) { %>
            compass: {
                files: ['<%%= config.app %>/<%%= config.public %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },<% } %>
            styles: {
                files: ['<%%= config.app %>/<%%= config.public %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= config.app %>/<%%= config.public %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%%= config.app %>/<%%= config.public %>/images/{,*/}*'
                ]
            },
            haxe: {
    		    files: ["haxe/*.*"],
    		    tasks: ["build"]
    	    }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static( config.app + '/' + config.public )
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%%= config.dist %>/<%%= config.public %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= config.dist %>/<%%= config.public %>/*',
                        '!<%%= config.dist %>/<%%= config.public %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        <% if (includeCompass) { %>

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= config.app %>/<%%= config.public %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= config.app %>/<%%= config.public %>/images',
                javascriptsDir: '<%%= config.app %>/<%%= config.public %>/scripts',
                fontsDir: '<%%= config.app %>/<%%= config.public %>/styles/fonts',
                importPath: './bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= config.dist %>/<%%= config.public %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },<% } %>

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%%= config.app %>/<%%= config.public %>/index.html'],
                ignorePath: '<%%= config.app %>/<%%= config.public %>/',<% if (includeCompass) { %>
                exclude: ['bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js']<% } else { %>
                exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']<% } %>
            }<% if (includeCompass) { %>,
            sass: {
                src: ['<%%= config.app %>/<%%= config.public %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: '<%%= config.app %>/<%%= config.public %>/bower_components/'
            }<% } %>
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= config.dist %>/<%%= config.public %>/scripts/{,*/}*.js',
                        '<%%= config.dist %>/<%%= config.public %>/styles/{,*/}*.css',
                        '<%%= config.dist %>/<%%= config.public %>/images/{,*/}*.*',
                        '<%%= config.dist %>/<%%= config.public %>/styles/fonts/{,*/}*.*',
                        '<%%= config.dist %>/<%%= config.public %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= config.dist %>/<%%= config.public %>'
            },
            html: '<%%= config.app %>/<%%= config.public %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= config.dist %>/<%%= config.public %>', '<%%= config.dist %>/<%%= config.public %>/images']
            },
            html: ['<%%= config.dist %>/<%%= config.public %>/{,*/}*.html'],
            css: ['<%%= config.dist %>/<%%= config.public %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/<%%= config.public %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= config.dist %>/<%%= config.public %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/<%%= config.public %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.dist %>/<%%= config.public %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= config.dist %>/<%%= config.public %>',
                    src: '{,*/}*.html',
                    dest: '<%%= config.dist %>/<%%= config.public %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/<%%= config.public %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%%= config.app %>/<%%= config.public %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/<%%= config.public %>/scripts/scripts.js': [
        //                 '<%%= config.dist %>/<%%= config.public %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>/<%%= config.public %>',
                    dest: '<%%= config.dist %>/<%%= config.public %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>',
                    dest: '<%%= config.dist %>',
                    src: [
                        '*.js',
                        'Procfile'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%%= config.dist %>',
                    src: [
                        'package.json'
                    ]
                }<% if (includeBootstrap) { %>, {
                    expand: true,
                    dot: true,<% if (includeCompass) { %>
                    cwd: '.',
                    src: ['bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'],<% } else { %>
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],<% } %>
                    dest: '<%%= config.dist %>/<%%= config.public %>'
                }<% } %>]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= config.app %>/<%%= config.public %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },<% if (includeModernizr) { %>

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '<%%= config.dist %>/<%%= config.public %>/scripts/vendor/modernizr.js',
            files: [
                '<%%= config.dist %>/<%%= config.public %>/scripts/{,*/}*.js',
                '<%%= config.dist %>/<%%= config.public %>/styles/{,*/}*.css',
                '!<%%= config.dist %>/<%%= config.public %>/scripts/vendor/*'
            ],
            uglify: true
        },<% } %>

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: {
                options : {
                    logConcurrentOutput : true
                },
                tasks: [
                    'watch',
                    'nodemon:server',
                    'open:server'
                ]
            },
            dist: [<% if (includeCompass) { %>
                'compass',<% } %>
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        nodemon:{
            server:{
                script : '<%%= config.app %>/server.js',
                options: {
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    watch : ['app/server.js']
                }
            }
        },

        haxe : {
            all : {
                hxml : 'build.hxml'
            }
        },

        open : {
            server : {
                path : 'http://localhost:9000'
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'haxe',
            'npm-install',
            <% if (includeCompass) { %>
            'compass:server',
            <% } %>
            'copy:styles',
            'autoprefixer',
            'concurrent:server'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'haxe',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',<% if (includeModernizr) { %>
        'modernizr',<% } %>
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
