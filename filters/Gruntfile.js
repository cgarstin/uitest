module.exports = function(grunt){
    // Public configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                laxbreak: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            all: {
                src: 'js/refinements.js'
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourceComments: true
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['scss/*.scss', 'scss/**/*.scss'],
                tasks: ['sass:dev'],
                options: {
                  interrupt: true
                }
            },
            all: {
                files: 'js/refinements.js',
                tasks: ['newer:jshint:all']    
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [ 'css/main.css',
                            '*.html',
                            '**/*.html',
                            'js/*.js',
                            'js/**/*.js'
                          ]
                },
                options: {
                    watchTask: true,
                    server: "",
                    index: "index.html",
                    tunnel: true
                }
            }
        }
    } );

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('dev', ['browserSync','watch']);
};