const http = require('http');
const path = require('path');
const fs = require('fs');

let server = http.createServer((req,res)=>{
    let filePath = null

    if (req.url == "/") {
        filePath = path.join(__dirname, "docs", "index.html");
       fs.readFile(filePath, (err,data)=>{
        if(err) throw err 

        res.end(data)
       })

    }else if (req.url == "/about") {
        filePath = path.join(__dirname, "docs", "about.html");

       fs.readFile(filePath, (err,data)=>{
        if(err) throw err 

        res.end(data)
       })

    }
})


server.listen(4000, ()=>{
    console.log("server is running on port 4000")
})