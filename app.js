const ctrl = require('./controllers'),
    ch = require('chokidar');

let matchedDirectories = [];

ctrl.helpers.getDirs((err,dirs)=>{
    matchedDirectories = dirs;
    for( let i in matchedDirectories){
        console.log('Started to watch ' +matchedDirectories[i].path)
        ch.watch(matchedDirectories[i].path,{ignored: /[\/\\]\./, ignoreInitial: true}).on('all', (event,filename) => {
            switch(event){
                case 'add':
                case 'change':
                    ctrl.helpers.resize(filename,matchedDirectories[i].params,()=>{
                        console.log('resized');
                    });
                    break;
                default:
                    break;
            };

        });
    }
});
