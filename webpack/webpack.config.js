var path = require('path');
var root = path.join(__dirname, "../");

//i18n
var makeAllFile = require("./geti18n").makeAllFile;

makeAllFile("./src/i18n/*", ["./src/components/*","./node_modules/@beisen/*"],"./dist/i18nAll/" )

//入口文件
var entry = {
    main: './src/entry.js'
};

options = Object.assign({}, {
    "root": root
    ,"entry": entry
    ,"host": "127.0.0.1"
    ,"port": "3000"
    ,"hot": true
    ,"devtool": "cheap-source-map"
    ,"debug": false
    ,"env": "dev"
    ,"isUseDashboard" : false  //执行start命令时设置为true,
    //但在dev1/dev2/demo分支时要设为false,否则会导致ci进程一直执行
});
module.exports =  require("@beisen/talent-core/webpack/desktop/webpack.config")(options);