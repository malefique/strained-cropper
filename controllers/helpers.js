const
    im = require('imagemagick-stream'),
    fs = require('fs'),
    cfg = require('../config'),
    async = require('async');

exports.getDirs = (callback) => {
    let tmp = [];
    let done = false;
    for( let j in cfg.watchers){
        fs.readdir(cfg.watchers[j].rootPath,(err, files)=>{
            for(var i in files){
                let fn = cfg.watchers[j].rootPath + '/' + files[i] + '/' + cfg.watchers[j].sourcePath;
                async.parallel({
                    isDirectory: (callback) =>{
                        exports.isDirectory({ fn: fn }, (result) => {
                            callback(null, result);
                        });
                    }
                }, (err,data) => {
                    if( fn.match(cfg.watchers[j].pattern) !== null && data.isDirectory ){
                        tmp.push({
                            path: fn,
                            params: cfg.watchers[j]
                        });
                        if( cfg.watchers.length - 1 === parseInt(j, 10) && files.length - 1 === parseInt(i, 10) ){
                            callback(null,tmp);
                        }
                    }
                });
            }
        });
    }
};

exports.resize = (file,params,callback) => {
    let fs_s = fs.createReadStream(file),
        fs_r = fs.createWriteStream(file.replace(params.sourcePath,params.resizePath)),
        {width, height} = params.dimension;
    im(file).resize((height ? width+'x'+height : width)).pipe(fs_r);
    fs_s.on('finish', () => {
        callback(null);
    });
};

exports.isDirectory = (params, callback) =>{
    fs.lstat(params.fn , (err,stats) => {
        if(stats){
            try{
                if(stats.isDirectory())
                    callback(true);
            } catch(e){
                console.log(e);
                callback(false);
            }
        }
        else
            callback(false);

    })
};