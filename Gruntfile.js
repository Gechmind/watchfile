module.exports=function(grunt){
'use strict';

	var watchPath = "C:\\SVN\\back-merchant\\branches\\2016\\sprint0323\\back-product-web\\src\\main\\webapp\\";
	var serverPath = "C:\\SVN\\back-merchant\\branches\\2016\\sprint0323\\back-product-web\\target\\back-product-web-2.0-SNAPSHOT";
	var gruntConfigPath = "C:\\gechmind_tool\\autocopy\\"


	grunt.initConfig({
		watch:{
			scritps:{
				files:[watchPath + "\\**\\*.js",watchPath + "\\**\\*.html"],
				tasks:['copy:single'],
				options:{
					spawn:false,
					debounceDelay: 250,
					dateFormat: function(time) {
				      grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
				      grunt.log.writeln('Waiting for more changes...');
				    }
				}
			},
			config:{
				files:[gruntConfigPath +"Gruntfile.js"],
				options:{
					reload:true
				}
			}
		},
		copy:{
			All:{
				files:[{
					expand:true,
					cwd :watchPath,
					src: ['**\\*.js'],
					dest: serverPath,
					filter:function(src,dest){
						// console.log(dest);
						console.log(src);
						if(src.indexOf('META-INF\\MANIFEST.MF') > -1){
							return;
						}
						return src;
					}
				}]
			},
			single:{
				expand:true,
				cwd:watchPath,
				src:[],
				dest:serverPath,
				filter:function(src){
					// console.log(src);
					return src;
				}
			}
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
		  console.log("==========="+filepath);
		  var relativePath = filepath.substring(watchPath.length+3);
		  console.log("+++++"+relativePath);
		  grunt.config("copy.single.src",relativePath);
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
	grunt.registerTask('hha',['copy']);
}