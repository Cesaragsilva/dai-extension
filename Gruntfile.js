module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                banner: '/* global require */\nwindow.plus_main = () => {\n',
                footer: '\n};\nif (!window.is_plus_loaded) {\n    window.is_plus_loaded = true;\n    window.plus_main();\n}',
                separator: '\n\n',
                process: function(file) {
                    return file.split('\n').map(function(line) {
                        return '    ' + line;
                    }).join('\n');
                }
            },
            dist: {
                src: [
                    'src/**/*.js'
                ],
                dest: './build/dai-extension.js',
            },
        },
        // babel: {
        //     options: {
        //         sourceMap: false,
        //         presets: ["env", "react"],
        //         plugins: ["transform-es2015-modules-amd"]
        //     },
        //     dist: {
        //         files: [{
        //             expand: true,
        //             src: ['src/**/*.js'],
        //             dest: './build/dai-extension',
        //             ext: '.js'
        //         }]
        //     }
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', ['concat']);
};
