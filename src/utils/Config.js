module.exports = global.config = {
    url: {
        production: false,
        dev: 'http://psmbna.edu.ve/API/api/',
        prod: 'http://192.168.1.59/'
    },
    headers: {
        production: false,
        dev: new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': 'Basic ' + btoa('P$m:Bn@')}),
        prod: ''
    },
    images: {
        local: process.env.PUBLIC_URL,
        api: 'http://192.168.1.24:8000/images/'
    },
    videos: {
        local: process.env.PUBLIC_URL,
        api: 'http://192.168.1.24:8000/videos/'
    }
};