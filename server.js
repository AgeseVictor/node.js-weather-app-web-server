const http = require("http");
const fs = require('fs');
const _ = require('lodash')

const server = http.createServer((req, res)=>{
    console.log("Website was visited!")
    const num = _.random(0,20);
    console.log(num)
    
    const greet = _.once((name)=>{
        console.log("hello " + name)
    } )
    greet("victor")
    greet("Agese")

    res.setHeader('Content-Type', 'text/html')

    let path = "./views/";
    switch (req.url) {
        case '/':
            path += "index.html"
            res.statusCode = 200;
        break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
        break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader("Location", '/about');
            res.end()
        break;
    
        default: 
            path += "404.html";
            res.statusCode = 404;
        break;
    }

    fs.readFile(path, (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.write(data);
            res.end();
        }
    })
})

server.listen(4000, "localhost", ()=>{
    console.log("server is running");
})