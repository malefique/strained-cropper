const config = {};

config.mimeTypes = {
    'jpg': [
        'image/jpeg',
        'image/pjpeg'
    ],
    'jpeg': [
        'image/jpeg',
        'image/pjpeg'
    ],
    'png':[
        'image/png'
    ]
};

config.mediaPath = 'materials';

config.dimensions = {
    default: {
        width: 300
    }
};

config.watchers = [
    {
        pattern: new RegExp(config.mediaPath+'\/((.*?)(city|region|country)\_(.*?)\/|)','i'),
        rootPath: config.mediaPath,
        resizePath: 'resized',
        sourcePath: 'source',
        dimension: config.dimensions.default
    }
];



config.quality = 100;

module.exports = config;