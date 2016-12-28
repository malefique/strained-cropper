const ctrl = require('./controllers'),
    fs = require('fs');

let matchedDirectories = [];

ctrl.helpers.getDirs((err,dirs)=>{
    matchedDirectories = dirs;
    for( var i in matchedDirectories){
        fs.watch(matchedDirectories[i], (eventType, filename) => {
            ctrl.helpers.resize(filename,()=>{
                console.log('resized');
            });
        });
    }
    console.log(matchedDirectories);
});
