const
    im = require('imagemagick-stream'),
    fs = require('fs'),
    cfg = require('../config');

exports.getDirs = (callback) => {
    let tmp = [];
    let done = false;
    for( var j in cfg.watchers){
        fs.readdir(cfg.watchers[j].rootPath,(err, files)=>{
            for(var i in files){
                let fn = cfg.watchers[j].rootPath + '/' + files[i] + '/' + cfg.watchers[j].resizePath;
                if( fn.match(cfg.watchers[j].pattern) !== null && fs.statSync(fn).isDirectory() ){
                    tmp.push(fn);
                    if( cfg.watchers.length - 1 === parseInt(j, 10) && files.length - 1 === parseInt(i, 10) ){
                        callback(null,tmp);
                    }
                }
            }
        });
    }
};

exports.resize = (file,dimensions,callback) => {
    let fs_s = fs.createWriteStream(file),
        {width, height} = dimensions;
    im(file).resize(width+'x'+height).pipe(fs_s);
    fs_s.on('finish', () => {
        callback(null);
    });
};