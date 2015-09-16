module.exports = function(grunt) {
	// Loading dependencies
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key !== "grunt-cli" && key.indexOf("grunt") === 0){
			grunt.loadNpmTasks(key);
		}
	}

	var gitDescribe = require('git-describe');
	var versionFromGitDescribe = gitDescribe(undefined, {customArguments: ["--always"]}).semverString;
	grunt.log.writeln("versionFromGitDescribe: " + versionFromGitDescribe);

	var browsers = [{
		browserName: "firefox",
		version: "19",
		platform: "WIN7"
	}, {
		browserName: "chrome",
		platform: "linux"
	}, {
		browserName: "internet explorer",
		platform: "WIN8",
		version: "10"
	}, {
		browserName: "internet explorer",
		platform: "WIN7",
		version: "9"
	}, {
		browserName: "safari",
		platform: "OS X 10.9",
		version: "7"
	}, {
		browserName: "safari",
		platform: "OS X 10.8",
		version: "6"
	}];

	grunt.initConfig({
		"connect": {
			server: {
				options: {
					base: "",
					port: 9999
				}
			}
		},
		'saucelabs-mocha': {
			all: {
				options: {
					urls: ["http://127.0.0.1:9999/test/in-browser.html"],
					tunnelTimeout: 5,
					concurrency: 3,
					browsers: browsers,
					testname: "cjtsd-js in-browser (" + versionFromGitDescribe + ")"
				}
			}
		},
		watch: {}
	});


	//grunt.registerTask("dev", ["connect", "watch"]);
	grunt.registerTask("test-in-remote-browsers", ["connect", "saucelabs-mocha"]);
};
