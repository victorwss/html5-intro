module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jasmine: {
			test: {
				src: "src/js/**/*.js",
				options: {
                    display: 'none',
                    summary: true,
                    host: "http://localhost:9002/",
					helpers: "helper/*.js",
                    specs: "spec/**/*.js"
				}
			},
        },
        connect: {
            options: {
                keepalive: false,
            },
            test: {
				options: {
                    port: 9002
				}
			}
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    
    grunt.registerTask("test", ['connect', 'jasmine']);
};