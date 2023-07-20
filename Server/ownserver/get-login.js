const url = require('url');
const fs = require('fs');
const path = require('path');
module.exports = function doGetLogin(request, response){
    const getData = request.url;
    const obj = url.parse(getData, true);
    console.log('Get ', obj);
    if(obj.query.userid ==='admin' && obj.query.password ==='111'){
        const fullPath = path.join(__dirname, 'public','dashboard.html');
        const stream = fs.createReadStream(fullPath);
        response.statusCode = 302;
        response.setHeader('Location','/dashboard.html');
        console.log('FullPath ', fullPath);
        stream.pipe(response);
        //response.write('Welcome Admin ');
    }
    else{
        response.write('Invalid Admin Userid and password');
        response.end();
    }
    
}