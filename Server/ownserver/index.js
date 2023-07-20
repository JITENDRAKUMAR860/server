const chalk = require('chalk');
const http = require('http');
const figlet = require('figlet');
const path = require('path');
const fs = require('fs');
const login = require('./login');
const getLogin = require('./get-login');
const bigTask = require('./big-task');
function servePage(response, fileName = 'index.html'){
    
   
   // response.setHeader('refresh', "3");
    const fullPath= path.join(__dirname,'public',fileName);
    const extension = path.extname(fullPath);
    console.log('Extension is ', extension);
    if(extension==='.css'){
        response.setHeader('Content-Type', 'text/css');
    }
    else if(extension ==='.mp4'){
        response.setHeader('Content-Type','video/mp4')
    }
    else{
        response.setHeader('Content-Type', 'text/html');
    }
    const readStream  = fs.createReadStream(fullPath);
    readStream.pipe(response);

}

function isStaticContent(fileName ){
    if(fileName==='/'){
        fileName= 'index.html';
    }
    const staticExt  = [".html", ".css", ".js", ".png", ".jpeg", ".mp4"];
    const fullPath= path.join(__dirname,'public',fileName);
    const extension = path.extname(fullPath);
    return staticExt.indexOf(extension)>=0;
}

function handleRequestAndResponse(request, response){
    console.log("Here Request Comes.... ", request.url);
    const urlString = request.url;
    const method = request.method;
    if(isStaticContent(urlString)){
        if(urlString === '/'){
                servePage(response);
            }
            else {
                servePage(response, urlString);
            }
    }
    else if (urlString === '/login' && method ==='POST'){
        login(request, response);
        // response.write('Login Request ');
        // response.end();
    }
    else if (urlString.startsWith('/login') && method ==='GET'){
        getLogin(request, response);
        // response.write('Login Request ');
        // response.end();
    }
    else if(urlString == '/big-task'){
        bigTask();
        response.write('Big Task Done....');
        response.end();
    }
    else{
        response.write('OOPS U Type Something Else...');
        response.end();
    }
   
    // Serve Static Pages


    // Serve Dynamic Content

    //servePage(response);
    //console.log('Request Rec ');
    // response.setHeader('Content-Type', 'text/html');
    // response.setHeader('refresh', "3");
    //<meta http-equiv="refresh" content="10">
    // response.write('<h1>Hello Client......</h1>');
    //response.end();
}


const cluster = require('cluster');
const os = require('os');
if(cluster.isMaster){ // Master Trigger Child Processes....
    console.log('Master happens....');
    const cores = os.cpus().length;
    for(let i= 1; i<=cores; i++){
        cluster.fork(); // Node Instance (Child Process)
    }
    cluster.on('online',(worker)=>{
        console.log('Worker Online ', worker.process.pid);
    });
    cluster.on('exit',(worker)=>{

    })
}
else{
    console.log('Fork Happens....')
    // Pizza

    const server = http.createServer(handleRequestAndResponse);
server.listen(process.env.PORT || 9755 , err=>{
    if(err){
        console.log(chalk.red.bold('Error During Server Up '), err);
    }
    else{
        figlet('Server UP.. ',(err, data)=>{
            if(err){
                console.log('Error in Figlet');
            }
            else{
                console.log(chalk.green.bold(data));
                console.log(chalk.yellow.bold('@ '+server.address().port));
            }
        })
        //console.log(chalk.green.bold('Server Up and Running '), server.address().port);
    }
})
} 
