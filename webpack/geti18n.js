var path = require('path');
var grunt = require('grunt');
var fs = require('fs');

// 第一个path 表示全部的 i18n文件存放地址 是一个文件夹 ./src/containers/*
// 第二个path 表示组件的 i18n文件 地址 比如 ./components/*/i18n/index
// 第三个表示输出地址 其实最好默认一个 ./stat/i18n/

var getFirstFiles = function(filePath){
	
	var channels = grunt.file.expand(filePath);
	
	var results = {};
	for(var i = 0; i < channels.length; i++){
		var channel = channels[i];
		var channelName = channel.slice(channel.lastIndexOf('/')+1);

		if(!grunt.file.isDir(channel))
		{	
			results[channelName] = channel;
		}
	}
	return results;
}
// ./components/*
var getEveryI18ns = function(filePath){
	
	var channels = grunt.file.expand(filePath);
	var results = {};
	for(var i = 0; i < channels.length; i++){
		var channel = channels[i];
		var channelName = channel.slice(channel.lastIndexOf('/')+1);
	
		if(grunt.file.isDir(channel+"/i18n"))
		{	
			var endMap = getFirstFiles(channel+"/i18n/*");
			results[channelName] = endMap;
		}
	}
	return results;
}

var makeAllFile = function (firstPath, secondPath, endPath){

	var mainFiles = getFirstFiles(firstPath);
	var allFilesList = [];
	for(var q = 0, length = secondPath.length; q < length; q++){
		var tempPath = secondPath[q];
		var allFilesT = getEveryI18ns(tempPath);
		allFilesList.push(allFilesT);
	}

	for(var i in mainFiles){
		var fileName = i;
		var filePath = mainFiles[i];
		var folder_exists = fs.existsSync(filePath);
		var Alldata = fs.readFileSync(filePath, "utf-8");

		Alldata = JSON.parse(Alldata);
		var oldI18n = Alldata;

		for(var w = 0, wlength = allFilesList.length ; w < wlength; w++){
			var allFiles = allFilesList[w];

			for(var j in allFiles){
				var componenName = j;
				var tempFiles = allFiles[j];
				if(tempFiles){
					var tempFilePath = tempFiles[fileName];
					if(tempFilePath){
						var data = fs.readFileSync(tempFilePath, "utf-8");
						data = JSON.parse(data);

						var newI18n = data;
						oldI18n[componenName] = data
					}
				}
			}

		}
		
		// Alldata.oldI18n = oldI18n;
		var tempFileString = JSON.stringify(Alldata)
		var endPath_exists = fs.existsSync(endPath);
		if(!endPath_exists){
			//fs.mkdirSync(endPath);
			//循环创建dist目录和其下的i18nAll文件夹
      var pathtmp;
      endPath.split('/').forEach(function(dirname) {
        if (pathtmp) {
          pathtmp = path.join(pathtmp, dirname);
        } else {
          pathtmp = dirname;
        }
        if (!fs.existsSync(pathtmp)) {
          if (!fs.mkdirSync(pathtmp)) {
            return false;
          }
        }
      });
		}	

		fs.writeFile(endPath+fileName, tempFileString,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});
	}
}

module.exports = {
	makeAllFile:makeAllFile
}