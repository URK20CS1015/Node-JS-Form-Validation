var http = require('http');
const fs = require('fs');
const server = http.createServer(function (req, res) {
    if(req.url==='/'){
        res.writeHead(200,{"Content-Type": "text/html"});
        fs.createReadStream('./exform.html').pipe(res);
    }
    else if(req.url ==='/server' && req.method == 'POST'){
        var recData = '';
        req.on('data',function(data){
            recData += data;
        })
        req.on('end',function(){
            var inputdata = new URLSearchParams(recData);
            res.writeHead(200,{"Content-Type": "text/html"});
            res.write('<u style="color:blue">USER SUBMITTED DETAILS</u><br>')
            res.write('<table border=1 cellspacing=0 padding=1 style="color:blue"><tr><td>Name</td><td>'+inputdata.get('name') + '</td></tr>');
            res.write('<tr><td>Password</td><td>'+inputdata.get('pass') + '</td></tr>');
            res.write('<tr><td>Age</td><td>'+inputdata.get('age') + '</th></tr>');
            res.write('<tr><td>Mobile Number</td><td>'+inputdata.get('tel') + '</td></tr>');
            res.write('<tr><td>Email</td><td>'+inputdata.get('email') + '</td></tr>');
            res.write('<tr><td>Gender</td><td>'+inputdata.get('gen') + '</td></tr>');
            res.write('<tr><td>State</td><td>'+inputdata.get('state') + '</td></tr>');
            res.write('<tr><td>Skills</td><td>'+inputdata.get('skill[]') + '</td></tr></table>');
            res.end();
        });
    }
});
server.listen(2000,function(){
    console.log('listening at 2000')
});