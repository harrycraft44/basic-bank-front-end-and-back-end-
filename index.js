var fs = require("fs");
var express = require('express');
const bp = require('body-parser')
const app = express()
const { encryptString, decryptString } = require("@gykh/caesar-cipher");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const { application } = require("express");
var keys = ['uwu']
var ip = require("ip");

var userns = []
var userps = []
var bal = []
var tnumber = []

console.log("startup")
function gd(){
    userns = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/users.txt", 'utf8').split(",");
    userps = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/passwords.txt", 'utf8').split(",");
    bal = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/bal.txt", 'utf8').split(",");
    tnumber = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/tnumber.txt", 'utf8').split(",");

}
function sa(){
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/users.txt', userns.join(","));
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/passwords.txt',userps.join(","));
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/bal.txt',bal.join(","));
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/tnumber.txt',tnumber.join(","));

}
function check(userd, pads){
    if(userns.includes(userd)){
        
        console.log(userps[userns.indexOf(userd)])
        if(userps[userns.indexOf(userd)]== pads){
            return true;
            res.end();

        }else{
            return false;
        }
    }else{
        return false;
    }
}
gd();
console.log("loaded files")
app.get('/login',function (req, res){
    res.end(fs.readFileSync("./html/login/index.html", 'utf8'))
})
app.get('/login/style.css',function (req, res){
    res.end(fs.readFileSync("./html/login/style.css", 'utf8'))
})
app.get('/sign-up',function (req, res){
    res.end(fs.readFileSync("./html/sign-up/index.html", 'utf8'))
})
app.get('/sign-up/style.css',function (req, res){
    res.end(fs.readFileSync("./html/sign-up/style.css", 'utf8'))
})
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



app.post('/api/login', function (req, res) {
    var user = req.body.username;
    var pas = req.body.password;
    console.log(userns[0])
    console.log(user)


    if(userns.includes(user)){
        
        console.log(userps[userns.indexOf(pas)])
        if(userps[userns.indexOf(user)]== pas){
            res.cookie('lo', `${encryptString(user+","+pas,4)}`)
            res.redirect("/")
            res.end();

        }else{
            res.send("pasword incorrect")
            res.end();
        }
    }else{
        res.send("user dose not exist")
        res.end();
    }
});
app.post('/api/signup', function (req, res) {
    var user = req.body.username;
    var pas = req.body.password;
    console.log(JSON.stringify(req.body))
    if(!userns.includes(user)){
    userns.push(user);
    userps[userns.indexOf(user)]= pas
    bal[userns.indexOf(user)]= 0
    tnumber[userns.indexOf(user)]= Math.floor(1000000000 + Math.random() * 9999999999)

    sa();
    res.redirect("/login")
    }else{
        res.send("username already exist")
    }
});
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.get('/', function (req, res) {
if(req.cookies.lo == undefined){
    res.redirect("/login")
    return true;
}
    var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    var password = usda.split(",")[1]
    var ball = bal[userns.indexOf(username)]
    var ttnumber = tnumber[userns.indexOf(username)]
    gd();
    if(check(username,password)){
        res.send(`<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>dashboard</title>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'><link rel="stylesheet" href="./dashboard/style.css">
          <script >
          
            function s() {
            window.location.href = "api/send/?t=" + document.getElementById('userid').value + "&m=" +document.getElementById('money').value + "&"+document.cookie.replace("'","");
        }
  
          </script>

        </head>
        <body>
        <!-- partial:index.partial.html -->

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

        <div class = "navbar">
          <h3>BOO</h3>
          <ul>
            <li><b><i class="fab fa-elementor"></i>&nbsp;&nbsp;Dashboard</b></li>
            <a href="/logout"><li ><b><i class="material-icons" style="font-size: 14px;">logout</i>&nbsp;&nbsp;Logout</b></li></a>
          </ul>
        </div>
        
        <div class = "dashboard">
          <div class = "top-bar">
            <div class="a"></div>
            <div class = "profile-data">
              <span><b>${username}</b></span>
            </div>
            
            
          </div>
          <div class = "text-title">
            <h1><b>Dashboard</b></h1>
            </div>
          <div class = "row-1">
            <div class = "col-1 col">
              <h2>Balance</h2>
              <p><b>£${ball}</b><b class = "fraction"></b></p>
            </div>
            <div class = "col-2 col">
              <p class = "title"><b>${username} details</b></p>
              <p class = "card-no">${ttnumber}</p>                   <span id = "name">${username}</span>
              <span id = "kst"></span>
            </div>
          </div>
           <div class = "row-1">
            <div class = "col-2 col" >
          <h2 class = "text-title">send money</h2>
          <div style="padding-left:30px">
            <input type = "text" id="userid" class="nb" >
            <input type = "text" id="money" class="nb" >
            <input type="submit" class="btn" onclick="s();">
            <div>
            </div>
          </div>
          <div class = "row-2">
            <div class= "col-1">
              <br><br><br><br>
        
            </div>
          </div>
        </div>
        <!-- partial -->
          
        </body>
        </html>
        `)
    }else{

    }
})

app.get('/api/send', function (req, res) {
  
    var usda = decryptString(req.query.lo, 4);
    var username = usda.split(",")[0]
    var ball = bal[userns.indexOf(username)]

    console.log(ball)

    var ne = parseInt(req.query.m);
    var tnr = req.query.t;
if(ne < parseInt(ball)){
    if(tnumber.includes(tnr)){
        bal[tnumber.indexOf(tnr)] = parseInt(bal[tnumber.indexOf(tnr)]) + ne
        bal[userns.indexOf(username)] = parseInt(ball) - ne   
        sa();
        res.redirect("/approved")
    }else{
        res.send("dose not exist")
    }
}else{
    res.end("broke bitch")
}
});
app.get('/logout', function (req, res) {
    res.clearCookie("lo");
    res.redirect("/")
})
app.get('/approved', function (req, res) {
   res.end(fs.readFileSync("./html/approved/index.html", 'utf8')) 
});
app.get('/ap/style.css', function (req, res) {
    res.end(fs.readFileSync("./html/approved/style.css", 'utf8'))

})
app.get('/dashboard/style.css', function (req, res) {
    res.end(fs.readFileSync("./html/dashboard/style.css", 'utf8'))

})
app.get('/dashboard/js.js', function (req, res) {
    res.end(fs.readFileSync("./html/dashboard/js.js", 'utf8'))

})
app.get('/thegirlinabox.mp4', function (req, res) {
    res.setHeader("content-type", "some/type");
    fs.createReadStream("D:\\d\\Girl In The Box (2016) [1080p] [WEBRip] [YTS.MX]\\Girl.In.The.Box.2016.1080p.WEBRip.x264.AAC-[YTS.MX].mp4").pipe(res);
   
});
app.get('/world.zip', function (req, res) {
    res.setHeader("content-type", "some/type");
    fs.createReadStream("C:\\Users\\harry\\AppData\\Roaming\\.minecraft\\saves\\world.zip").pipe(res);

});
    app.listen(80);
console.log("started")
